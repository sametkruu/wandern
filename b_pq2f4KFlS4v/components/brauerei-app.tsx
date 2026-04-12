"use client"

import { useState, useCallback, useEffect, useRef, createContext, useContext } from 'react'
import { useVisited, useNotes, usePacking, type NoteEntry } from '@/hooks/use-store'
import { BREWERIES, ROUTE_DAYS, GUIDE, BREWERY_KM, KM_MAP, VILLAGE_MESSAGES, DAY_TOASTS, STOPS_WAYPOINTS, type Brewery } from '@/lib/data'
import { 
  BeerIcon, WheatIcon, TreeIcon, FootIcon, PhoneIcon, GlobeIcon, PinIcon, 
  AlertIcon, UtensilsIcon, CheckIcon, ChatIcon, BookIcon, 
  ChevronIcon, ChevronRightIcon, PenIcon, TrashIcon, PlusIcon, CloseIcon,
  CompassIcon, BackpackIcon, NotebookPenIcon
} from '@/components/icons'
import { cn } from '@/lib/utils'

type TabType = 'route' | 'stops' | 'journal' | 'pack'
const TAB_ORDER: TabType[] = ['route', 'stops', 'journal', 'pack']

// Map route village display names to brewery loc names where they differ
const ROUTE_TO_LOC: Record<string, string> = {
  "Roßdorf am Forst": "Roßdorf",
}

export default function BrauereiApp() {
  const [activeTab, setActiveTab] = useState<TabType>('route')
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]))
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [showNoteSheet, setShowNoteSheet] = useState(false)
  const [noteSheetBrewery, setNoteSheetBrewery] = useState<Brewery | null>(null)
  const [noteType, setNoteType] = useState<'beer' | 'food' | 'comment'>('beer')
  const [noteText, setNoteText] = useState('')
  const [editingNote, setEditingNote] = useState<{ breweryId: number; noteId: number } | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastData, setToastData] = useState<typeof DAY_TOASTS[1] | null>(null)
  const [miniToast, setMiniToast] = useState<{ icon: string; text: string } | null>(null)
  const [journalSort, setJournalSort] = useState<'stop' | 'type'>('type')
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptLabel, setPromptLabel] = useState('')
  const [promptValue, setPromptValue] = useState('')
  const [promptCallback, setPromptCallback] = useState<((value: string) => void) | null>(null)
  const [headerHidden, setHeaderHidden] = useState(false)

  const { visited, toggleVisited, loaded: visitedLoaded } = useVisited()
  const { notes, addNote, updateNote, deleteNote, loaded: notesLoaded } = useNotes()
  const { packed, packList, togglePacked, addPackItem, editPackItem, deletePackItem, addCategory, loaded: packLoaded } = usePacking()

  // Handle scroll for header
  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScroll && st > 60) {
        setHeaderHidden(true)
      } else {
        setHeaderHidden(false)
      }
      lastScroll = st < 0 ? 0 : st
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleToggleVisit = useCallback((brewery: Brewery) => {
    const wasVisited = visited.has(brewery.id)
    toggleVisited(brewery.id)
    
    if (!wasVisited) {
      // Check if village is complete
      const villageBrews = BREWERIES.filter(b => b.loc === brewery.loc)
      const newVisited = new Set(visited)
      newVisited.add(brewery.id)
      const villageComplete = villageBrews.every(b => newVisited.has(b.id))
      
      // Check if day is complete
      const dayItems = BREWERIES.filter(b => b.day === brewery.day)
      const dayComplete = dayItems.every(b => newVisited.has(b.id))
      
      // Find next unvisited brewery in the same day
      const currentIndex = dayItems.findIndex(b => b.id === brewery.id)
      const nextBrewery = dayItems.slice(currentIndex + 1).find(b => !newVisited.has(b.id))

      // Close expanded card, then open next if any
      setExpandedCards(prev => {
        const next = new Set(prev)
        next.delete(brewery.id)
        if (nextBrewery && !dayComplete) {
          next.add(nextBrewery.id)
        }
        return next
      })

      if (nextBrewery && !dayComplete) {
        setTimeout(() => {
          const el = document.getElementById(`brewery-${nextBrewery.id}`)
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 40
            window.scrollTo({ top, behavior: 'smooth' })
          }
        }, 520)
      }
      
      if (villageComplete && !dayComplete) {
        const vm = VILLAGE_MESSAGES[brewery.loc]
        if (vm) {
          setMiniToast({ icon: vm.icon, text: vm.msg })
          setTimeout(() => setMiniToast(null), 5000)
        }
      }
      
      if (dayComplete) {
        setTimeout(() => {
          setToastData(DAY_TOASTS[brewery.day])
          setShowToast(true)
        }, 400)
      }
    }
  }, [visited, toggleVisited])

  const handleOpenNoteSheet = useCallback((brewery: Brewery) => {
    setNoteSheetBrewery(brewery)
    setNoteType('beer')
    setNoteText('')
    setEditingNote(null)
    setShowNoteSheet(true)
  }, [])

  const handleEditNote = useCallback((breweryId: number, note: NoteEntry) => {
    const brewery = BREWERIES.find(b => b.id === breweryId)
    if (brewery) {
      setNoteSheetBrewery(brewery)
      setNoteType(note.type)
      setNoteText(note.text)
      setEditingNote({ breweryId, noteId: note.id })
      setShowNoteSheet(true)
    }
  }, [])

  const handleSaveNote = useCallback(() => {
    if (!noteSheetBrewery || !noteText.trim()) return
    
    if (editingNote) {
      updateNote(editingNote.breweryId, editingNote.noteId, { type: noteType, text: noteText.trim() })
    } else {
      addNote(noteSheetBrewery.id, { type: noteType, text: noteText.trim() })
    }
    
    setShowNoteSheet(false)
    setNoteSheetBrewery(null)
    setNoteText('')
    setEditingNote(null)
  }, [noteSheetBrewery, noteType, noteText, editingNote, addNote, updateNote])

  const openPrompt = useCallback((label: string, value: string, callback: (value: string) => void) => {
    setPromptLabel(label)
    setPromptValue(value)
    setPromptCallback(() => callback)
    setShowPrompt(true)
  }, [])

  const handleConfirmPrompt = useCallback(() => {
    if (promptCallback && promptValue.trim()) {
      promptCallback(promptValue.trim())
    }
    setShowPrompt(false)
    setPromptCallback(null)
  }, [promptCallback, promptValue])

  const isDayComplete = useCallback((day: number) => {
    const dayItems = BREWERIES.filter(b => b.day === day)
    return dayItems.every(b => visited.has(b.id))
  }, [visited])

  const switchTab = useCallback((tab: TabType) => {
    setSlideDirection(TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(activeTab) ? 'right' : 'left')
    setActiveTab(tab)
    window.scrollTo(0, 0)
  }, [activeTab])

  const goToDay = useCallback((day: number) => {
    setExpandedDays(new Set([day]))
    setExpandedCards(new Set())
    switchTab('stops')
    setTimeout(() => {
      const el = document.getElementById(`day-${day}`)
      if (el) {
        if (day === 1) {
          window.scrollTo(0, 0)
        } else {
          el.scrollIntoView({ block: 'start', behavior: 'instant' })
        }
      }
    }, 100)
  }, [switchTab])

  if (!visitedLoaded || !notesLoaded || !packLoaded) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    )
  }

  const totalPacked = packList.reduce((sum, cat) => sum + cat.items.length, 0)
  const packedCount = packed.size

  return (
    <div className="min-h-dvh bg-[#09090b] text-zinc-300">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-transform duration-300 pointer-events-none",
          headerHidden && "-translate-y-full"
        )}
        style={{ 
          background: 'linear-gradient(to top, transparent 0%, rgba(9,9,11,0.6) 30%, #09090b 50%)',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: '55px'
        }}
      >
        <div className="max-w-[640px] mx-auto px-6 pt-3 pb-1 flex items-center justify-between pointer-events-auto">
          <div>
            <h1 className="text-[26px] font-semibold text-zinc-50 tracking-tight leading-[23px]">Fränkischer Wandern</h1>
            <p className="text-[11px] text-zinc-500 font-medium tracking-wide mt-[4px]">Der 13 Brauereien Weg</p>
          </div>
          {visited.size > 0 && (
            <div className="text-right shrink-0">
              <div className="text-[26px] font-bold text-emerald-500 leading-none tracking-tight">{visited.size}</div>
              <div className="text-[9px] text-zinc-600 font-semibold tracking-wider uppercase mt-0.5">of {BREWERIES.length}</div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[640px] mx-auto px-6" style={{ paddingTop: 'calc(104px + env(safe-area-inset-top))', paddingBottom: 'calc(100px + env(safe-area-inset-bottom))' }}>
        {/* Route Tab */}
        {activeTab === 'route' && (
          <div className={cn("flex flex-col gap-5 animate-in fade-in duration-300", slideDirection === 'right' ? "tab-slide-from-right" : "tab-slide-from-left")}>
            {ROUTE_DAYS.map(day => {
              const dayComplete = isDayComplete(day.day)
              const dayBreweries = BREWERIES.filter(b => b.day === day.day)
              const dayVisitedCount = dayBreweries.filter(b => visited.has(b.id)).length
              return (
                <div 
                  key={day.day} 
                  className="cursor-pointer"
                  onClick={() => goToDay(day.day)}
                >
                  <div className="py-6">
                    <p className={cn(
                      "text-xs font-semibold tracking-wider mb-1",
                      dayComplete ? "text-emerald-500/70" : "text-zinc-500"
                    )}>
                      Day {day.day}{' '}
                      <span className={cn(
                        "font-normal",
                        dayComplete ? "text-emerald-500/50" : "text-zinc-600"
                      )}>·</span>{' '}
                      <span className={cn(
                        "font-normal",
                        dayComplete ? "text-emerald-500/50" : "text-zinc-600"
                      )}>{day.date}</span>
                    </p>
                    <h2 className={cn(
                      "text-2xl font-bold tracking-tight",
                      dayComplete ? "text-emerald-500" : "text-zinc-50"
                    )}>
                      {day.title}
                    </h2>
                    <p className={cn(
                      "text-sm font-semibold mt-1",
                      dayComplete ? "text-emerald-500/70" : "text-zinc-500"
                    )}>
                      {day.km}
                      <span className={cn(
                        "font-medium ml-2",
                        dayComplete ? "text-emerald-500/70" : (dayVisitedCount > 0 ? "text-emerald-600" : "")
                      )}>
                        · {dayVisitedCount}/{dayBreweries.length}
                      </span>
                    </p>
                    
                    {/* Timeline */}
                    <div className="mt-5">
                      {day.villages.map((v, i) => {
                        const locName = ROUTE_TO_LOC[v.n] ?? v.n
                        const villageBrews = BREWERIES.filter(b => b.day === day.day && b.loc === locName)
                        const villageComplete = villageBrews.length > 0 && villageBrews.every(b => visited.has(b.id))
                        return (
                        <div key={i} className="flex gap-3 relative">
                          <div className="flex flex-col items-center w-5 shrink-0 pt-1">
                            <div className={cn(
                              "w-2.5 h-2.5 rounded-full z-10",
                              villageComplete ? "bg-emerald-500" : "bg-zinc-600"
                            )} />
                            {i < day.villages.length - 1 && (
                              <div className="w-0.5 flex-1 bg-zinc-800 min-h-[44px]" />
                            )}
                          </div>
                          <div className="pb-4">
                            <div className="flex items-center gap-2">
                              <span className={cn("text-sm font-semibold", villageComplete ? "text-emerald-500" : "text-zinc-300")}>{v.n}</span>
                              {v.tag && (
                                <span className={cn(
                                  "text-[9px] font-semibold rounded-md px-1.5 py-0.5 tracking-wider uppercase border",
                                  v.tag === 'Start' ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" :
                                  v.tag === 'Basecamp' ? "text-amber-500 bg-amber-500/10 border-amber-500/20" :
                                  v.tag === 'Finish' ? "text-blue-400 bg-blue-400/10 border-blue-400/20" :
                                  v.tag === 'Return' ? "text-violet-400 bg-violet-400/10 border-violet-400/20" :
                                  v.tag === 'No stops' ? "text-zinc-600 bg-zinc-500/10 border-zinc-500/30" :
                                  "text-zinc-500 bg-zinc-500/10 border-zinc-500/20"
                                )}>
                                  {v.tag}
                                </span>
                              )}
                              {v.s > 0 && (
                                <span className="text-[11px] font-semibold text-zinc-500 ml-1">
                                  {v.s} stop{v.s > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                            {v.d && (
                              <div className="text-[11px] text-zinc-600 font-medium mt-0.5 flex items-center gap-1">
                                <FootIcon size={11} color="#71717a" />
                                {v.d}
                              </div>
                            )}
                          </div>
                        </div>
                        )
                      })}
                    </div>
                    
                    <p className="text-[13px] text-zinc-500 leading-relaxed mt-2">{day.vibe}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Stops Tab */}
        {activeTab === 'stops' && (
          <div className={cn("relative flex flex-col gap-2 animate-in fade-in duration-300 pb-4 -ml-2", slideDirection === 'right' ? "tab-slide-from-right" : "tab-slide-from-left")}>
            {/* Dotted vertical timeline */}
            <div 
              className="absolute top-4 bottom-8 left-[15px] w-[3px] -translate-x-1/2 z-0"
              style={{
                background: '#27272a',
                maskImage: 'radial-gradient(circle 1.5px, #000 100%, transparent 100%)',
                maskSize: '3px 6px',
                maskRepeat: 'repeat-y',
                WebkitMaskImage: 'radial-gradient(circle 1.5px, #000 100%, transparent 100%)',
                WebkitMaskSize: '3px 6px',
                WebkitMaskRepeat: 'repeat-y',
              }}
            />
            {[1, 2, 3].map(day => {
              const dayData = ROUTE_DAYS.find(d => d.day === day)!
              const isExpanded = expandedDays.has(day)
              const dayComplete = isDayComplete(day)
              const dayBreweries = BREWERIES.filter(b => b.day === day)
              
              // Group by location
              const locationGroups: { loc: string; breweries: Brewery[] }[] = []
              let currentLoc = ''
              dayBreweries.forEach(b => {
                if (b.loc !== currentLoc) {
                  currentLoc = b.loc
                  locationGroups.push({ loc: b.loc, breweries: [] })
                }
                locationGroups[locationGroups.length - 1].breweries.push(b)
              })

              return (
                <div key={day} id={`day-${day}`} className="scroll-mt-[104px]">
                  {/* Day Header */}
                  <div 
                    className="pt-6 pb-4 cursor-pointer relative pl-[40px]"
                    onClick={() => setExpandedDays(prev => {
                      const next = new Set(prev)
                      if (next.has(day)) {
                        next.delete(day)
                      } else {
                        next.add(day)
                      }
                      return next
                    })}
                  >
                    {/* Rectangle marker for day headers */}
                    <div 
                      className={cn(
                        "absolute left-[15px] top-6 -translate-x-1/2 w-1.5 rounded-sm z-10 transition-all",
                        isExpanded ? "h-14" : "h-[72px]",
                        dayComplete 
                          ? (isExpanded ? "bg-emerald-500" : "bg-emerald-700")
                          : (isExpanded ? "bg-zinc-50" : "bg-zinc-600")
                      )}
                      style={{ boxShadow: '0 0 0 4px #09090b' }}
                    />
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h2 
                          className={cn(
                            "text-[32px] font-bold tracking-tight leading-none transition-colors flex items-center gap-2",
                            dayComplete
                              ? (isExpanded ? "text-emerald-500" : "text-emerald-700")
                              : (isExpanded ? "text-zinc-50" : "text-zinc-600")
                          )}
                        >
                          Day {day}
                        </h2>
                        <p 
                          className={cn(
                            "text-xs font-medium mt-1.5 tracking-wide transition-colors",
                            dayComplete 
                              ? (isExpanded ? "text-emerald-500" : "text-emerald-700")
                              : (isExpanded ? "text-zinc-50" : "text-zinc-600")
                          )}
                        >
                          <span className="font-semibold">{dayData.date}</span>
                          <span className="text-zinc-500"> · </span>
                          <span className={cn(
                            "transition-colors",
                            dayComplete 
                              ? (isExpanded ? "text-emerald-500/70" : "text-emerald-700/70")
                              : "text-zinc-600"
                          )}>{dayData.title}</span>
                        </p>
                        
                        {/* Collapsed location preview */}
                        {!isExpanded && (
                          <p className={cn(
                            "text-[11px] mt-1 font-medium leading-relaxed transition-colors",
                            dayComplete ? "text-emerald-700" : "text-zinc-600"
                          )}>
                            {locationGroups.map(g => g.loc).join(' · ')}
                          </p>
                        )}
                      </div>
                      <ChevronIcon 
                        size={18} 
                        className={cn(
                          "transition-transform mt-1",
                          !isExpanded && "-rotate-90",
                          dayComplete
                            ? (isExpanded ? "text-emerald-500" : "text-emerald-700")
                            : (isExpanded ? "text-zinc-50" : "text-zinc-600")
                        )}
                      />
                    </div>
                  </div>

                  {/* Day Content */}
                  <div className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}>
                    <div className="overflow-hidden">
                      {/* Start waypoints (pass-through villages at beginning of day) */}
                      {STOPS_WAYPOINTS[day]?.start.map((wp, i) => (
                        <div key={`start-${wp.n}-${i}`} className="relative z-10 py-2 pl-[40px]">
                          <div 
                            className="absolute left-[15px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 transition-colors"
                            style={{ 
                              background: '#3f3f46',
                              boxShadow: '0 0 0 3px #09090b' 
                            }}
                          />
                          <span className="text-[10px] font-medium text-zinc-600 mr-2">
                            {wp.ck}
                          </span>
                          <span className="text-[11px] font-semibold text-zinc-600 tracking-wider uppercase">
                            {wp.n}
                          </span>
                          <span className="text-[10px] font-medium text-zinc-600 ml-2">
                            · Day: {wp.rk}
                          </span>
                        </div>
                      ))}
                      
                      {locationGroups.map((group, gi) => {
                        const villageComplete = group.breweries.every(b => visited.has(b.id))
                        return (
                        <div key={group.loc}>
                          {/* Location Header */}
                          <div className="relative z-10 py-2 pl-[40px]">
                            <div 
                              className="absolute left-[15px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 transition-colors"
                              style={{ background: villageComplete ? '#2a8d65' : '#3f3f46', boxShadow: '0 0 0 3px #09090b' }}
                            />
                            <span className="text-[10px] font-medium text-zinc-600 mr-2">
                              {KM_MAP[group.loc]?.c ? `km ${KM_MAP[group.loc].c}` : ''}
                            </span>
                            <span className={cn("text-[11px] font-semibold tracking-wider uppercase transition-colors", villageComplete ? "text-emerald-700" : "text-zinc-600")}>
                              {group.loc}
                            </span>
                            {day > 1 && KM_MAP[group.loc]?.r && (
                              <span className="text-[10px] font-medium text-zinc-600 ml-2">
                                · Day: {KM_MAP[group.loc].r}
                              </span>
                            )}
                          </div>
                          
                          {/* Brewery Cards */}
                          {group.breweries.map(brewery => (
                            <BreweryCard
                              key={brewery.id}
                              brewery={brewery}
                              isVisited={visited.has(brewery.id)}
                              isExpanded={expandedCards.has(brewery.id)}
                              onToggleExpand={() => {
                                const isCurrentlyExpanded = expandedCards.has(brewery.id)
                                setExpandedCards(prev => {
                                  const next = new Set(prev)
                                  if (next.has(brewery.id)) {
                                    next.delete(brewery.id)
                                  } else {
                                    next.add(brewery.id)
                                  }
                                  return next
                                })
                                if (!isCurrentlyExpanded) {
                                  setTimeout(() => {
                                    const el = document.getElementById(`brewery-${brewery.id}`)
                                    if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' })
                                  }, 50)
                                }
                              }}
                              onToggleVisit={() => handleToggleVisit(brewery)}
                              onOpenNote={() => handleOpenNoteSheet(brewery)}
                            />
                          ))}
                        </div>
                        )
                      })}
                      
                      {/* End waypoints (pass-through villages at end of day) */}
                      {STOPS_WAYPOINTS[day]?.end.map((wp, i) => (
                        <div key={`end-${wp.n}-${i}`} className="relative z-10 py-2 pl-[40px]">
                          <div 
                            className="absolute left-[15px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 transition-colors"
                            style={{ 
                              background: '#3f3f46',
                              boxShadow: '0 0 0 3px #09090b' 
                            }}
                          />
                          <span className="text-[10px] font-medium text-zinc-600 mr-2">
                            {wp.ck}
                          </span>
                          <span className="text-[11px] font-semibold text-zinc-600 tracking-wider uppercase">
                            {wp.n}
                          </span>
                          <span className="text-[10px] font-medium text-zinc-600 ml-2">
                            · Day: {wp.rk}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Journal Tab */}
        {activeTab === 'journal' && (
          <JournalTab
            notes={notes}
            journalSort={journalSort}
            setJournalSort={setJournalSort}
            onEditNote={handleEditNote}
            onDeleteNote={deleteNote}
            slideDirection={slideDirection}
          />
        )}

        {/* Pack Tab */}
        {activeTab === 'pack' && (
          <div className={cn("flex flex-col animate-in fade-in duration-300", slideDirection === 'right' ? "tab-slide-from-right" : "tab-slide-from-left")}>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-zinc-50 flex items-center gap-2 tracking-tight">
                <BackpackIcon size={20} color="#fafafa" />
                Packing List
              </h2>
              <p className="text-xs text-zinc-500 mt-1">{packedCount} of {totalPacked} packed</p>
            </div>

            <SwipeGroup>
            {packList.map((category, ci) => (
              <div key={ci} className="mb-7">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[10px] font-semibold text-zinc-600 tracking-widest uppercase">
                    {category.cat}
                  </p>
                  <button 
                    onClick={() => openPrompt('New item:', '', (text) => addPackItem(ci, text))}
                    className="p-1"
                  >
                    <PlusIcon size={14} color="#8a8a92" />
                  </button>
                </div>
                {category.items.map(item => {
                  const packActions = (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openPrompt('Edit item:', item.text, (text) => editPackItem(item.id, text))
                        }}
                        className="flex items-center justify-center px-4 rounded-lg bg-zinc-700"
                      >
                        <PenIcon size={18} color="#a1a1aa" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePackItem(item.id)
                        }}
                        className="flex items-center justify-center px-4 rounded-lg bg-red-500/20"
                      >
                        <TrashIcon size={18} color="#f87171" />
                      </button>
                    </>
                  )
                  return (
                    <SwipeableItem
                      key={item.id}
                      actions={packActions}
                      bgColor="#18181b"
                      className={cn("rounded-lg", packed.has(item.id) && "opacity-60")}
                    >
                      <div className="flex items-center gap-3 py-2.5">
                        <div 
                          className={cn(
                            "w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer",
                            packed.has(item.id) 
                              ? "bg-emerald-700 border-emerald-700" 
                              : "bg-transparent border-zinc-700"
                          )}
                          onClick={() => togglePacked(item.id)}
                        >
                          {packed.has(item.id) && <CheckIcon size={14} color="#000" />}
                        </div>
                        <span 
                          className={cn(
                            "text-sm font-medium flex-1 transition-all cursor-pointer",
                            packed.has(item.id) 
                              ? "text-emerald-700 line-through" 
                              : "text-zinc-300"
                          )}
                          onClick={() => togglePacked(item.id)}
                        >
                          {item.text}
                        </span>
                      </div>
                    </SwipeableItem>
                  )
                })}
              </div>
            ))}
            </SwipeGroup>

            <button 
              onClick={() => openPrompt('Category name:', '', addCategory)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-dashed border-zinc-700 text-zinc-50 text-[13px] font-semibold mt-2"
            >
              <PlusIcon size={14} color="#fafafa" />
              Add category
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, transparent 0%, rgba(9,9,11,0.8) 20%, #09090b 45%, #09090b 100%)',
          paddingTop: '38px',
          paddingBottom: 'calc(24px + env(safe-area-inset-bottom))'
        }}
      >
        <div className="max-w-[640px] w-full mx-auto px-6 flex justify-between">
          <div className="flex gap-12 pointer-events-auto">
            <NavButton 
              icon={<CompassIcon size={22} color={activeTab === 'route' ? '#fafafa' : '#52525b'} strokeWidth={activeTab === 'route' ? 2.5 : 2} />}
              label="Route"
              active={activeTab === 'route'}
              onClick={() => switchTab('route')}
            />
            <NavButton 
              icon={<BeerIcon size={22} color={activeTab === 'stops' ? '#fafafa' : '#52525b'} strokeWidth={activeTab === 'stops' ? 2.5 : 2} />}
              label="Stops"
              active={activeTab === 'stops'}
              onClick={() => switchTab('stops')}
            />
            <NavButton 
              icon={<NotebookPenIcon size={22} color={activeTab === 'journal' ? '#fafafa' : '#52525b'} strokeWidth={activeTab === 'journal' ? 2.5 : 2} />}
              label="Notes"
              active={activeTab === 'journal'}
              onClick={() => switchTab('journal')}
            />
          </div>
          <div className="flex pointer-events-auto">
            <NavButton 
              icon={<BackpackIcon size={22} color={activeTab === 'pack' ? '#fafafa' : '#52525b'} strokeWidth={activeTab === 'pack' ? 2.5 : 2} />}
              label="Pack"
              active={activeTab === 'pack'}
              onClick={() => switchTab('pack')}
              align="end"
            />
          </div>
        </div>
      </nav>

      {/* Note Modal */}
      <Modal open={showNoteSheet} onClose={() => setShowNoteSheet(false)}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-zinc-50">
                {editingNote ? 'Edit Note' : 'Add Note'}
              </h2>
              {noteSheetBrewery && (
                <p className="text-xs text-zinc-500 mt-0.5">
                  {noteSheetBrewery.name} · {noteSheetBrewery.loc}
                </p>
              )}
            </div>
            <button 
              onClick={() => setShowNoteSheet(false)}
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700"
            >
              <CloseIcon size={18} color="#a1a1aa" />
            </button>
          </div>
          
          <div className="flex gap-2.5 mb-3">
            {(['beer', 'food', 'comment'] as const).map(type => {
              const colors = { beer: '#f59e0b', food: '#a78bfa', comment: '#1284ED' }
              const labels = { beer: 'Beer', food: 'Food', comment: 'Note' }
              const icons = { 
                beer: <BeerIcon size={15} color="currentColor" />,
                food: <UtensilsIcon size={15} color="currentColor" />,
                comment: <ChatIcon size={15} color="currentColor" />
              }
              const isActive = noteType === type
              return (
                <button
                  key={type}
                  onClick={() => setNoteType(type)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[13px] font-semibold transition-all",
                    isActive 
                      ? "border-current bg-current/10" 
                      : "border-white/10 text-zinc-500"
                  )}
                  style={isActive ? { color: colors[type], borderColor: `${colors[type]}40` } : {}}
                >
                  {icons[type]}
                  {labels[type]}
                </button>
              )
            })}
          </div>
          
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="What did you think?"
            className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 text-base resize-none h-[100px] outline-none focus:border-zinc-600"
          />
          
          <button
            onClick={handleSaveNote}
            className="w-full mt-3 py-3 rounded-lg bg-zinc-300 text-zinc-900 text-sm font-bold"
          >
            Save Note
          </button>
        </div>
      </Modal>

      {/* Prompt Modal */}
      <Modal open={showPrompt} onClose={() => setShowPrompt(false)}>
        <div className="p-6">
          <p className="text-sm font-semibold text-zinc-50 mb-3">{promptLabel}</p>
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirmPrompt()}
            className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 text-base outline-none focus:border-zinc-600"
            autoFocus
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleConfirmPrompt}
              className="flex-1 py-3 rounded-lg bg-zinc-300 text-zinc-900 text-sm font-bold"
            >
              Done
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="px-5 py-3 rounded-lg border border-zinc-700 text-zinc-500 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Day Complete Toast */}
      {showToast && toastData && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center w-[80%] max-w-[640px] animate-in zoom-in-95 duration-300">
            <div className="text-5xl mb-4">{toastData.i}</div>
            <div className="text-sm font-medium text-zinc-500 mb-1">{toastData.t}</div>
            <div className="text-2xl font-bold text-zinc-50 mb-1.5 tracking-tight">{toastData.r}</div>
            <div className="text-[13px] font-semibold text-emerald-500 mb-3">Complete ✓</div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-2">{toastData.s}</p>
            <p className="text-[13px] text-zinc-600 leading-relaxed mb-5">{toastData.n}</p>
            <button
              onClick={() => setShowToast(false)}
              className="w-full py-3 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Mini Toast */}
      {miniToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3.5 flex items-center gap-3 z-[90] w-[80%] max-w-[640px] shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <span className="text-2xl shrink-0">{miniToast.icon}</span>
          <span className="text-[13px] font-medium text-zinc-300">
            <span className="font-bold text-zinc-50">{miniToast.text.split(' — ')[0]}</span>
            {' — '}
            {miniToast.text.split(' — ')[1]}
          </span>
        </div>
      )}
    </div>
  )
}

// Brewery Card Component
function BreweryCard({ 
  brewery, 
  isVisited, 
  isExpanded, 
  onToggleExpand, 
  onToggleVisit,
  onOpenNote 
}: { 
  brewery: Brewery
  isVisited: boolean
  isExpanded: boolean
  onToggleExpand: () => void
  onToggleVisit: () => void
  onOpenNote: () => void
}) {
  const isBrew = brewery.type === 'brewery'
  const km = BREWERY_KM[brewery.id]
  const guide = GUIDE[brewery.id]
  
  const activeColor = isVisited ? '#2a8d65' : (isExpanded ? '#fafafa' : '#52525b')
  const visitedColor = '#2a8d65'

  return (
    <div id={`brewery-${brewery.id}`} className="relative z-10 mb-3 scroll-mt-[40px]">
      {/* Header */}
      <div 
        className="py-4 pl-[40px] flex items-start gap-3 cursor-pointer relative"
        onClick={onToggleExpand}
      >
        <span 
          className="absolute left-[15px] top-8 -translate-x-1/2 -translate-y-1/2 bg-[#09090b] p-1 rounded z-10"
        >
          {isBrew 
            ? <WheatIcon size={22} color={isVisited ? visitedColor : activeColor} strokeWidth={2.5} />
            : <TreeIcon size={22} color={isVisited ? visitedColor : activeColor} strokeWidth={2.5} />
          }
        </span>
        
        <div className="flex-1 min-w-0">
          <h3 
            className="text-2xl font-semibold tracking-tight leading-tight flex items-center gap-1.5"
            style={{ color: isVisited ? (isExpanded ? '#12d492' : visitedColor) : activeColor }}
          >
            {brewery.name}
          </h3>
          <p 
            className="text-[11px] -mt-0.5"
            style={{ color: isVisited ? visitedColor : (isExpanded ? 'var(--muted-foreground)' : '#52525b') }}
          >
            {brewery.loc} · {isBrew ? 'Brewery' : 'Beergarden'} · {km?.c || '?'}
            {brewery.food && (
              <span className="inline-flex align-middle relative -top-px ml-1">
                <UtensilsIcon size={12} color={isVisited ? visitedColor : (isExpanded ? '#71717a' : '#52525b')} />
              </span>
            )}
          </p>
          {isExpanded && (
            <p className="text-[11px] mt-1" style={{ color: isVisited ? visitedColor : 'var(--muted-foreground)' }}>
              {brewery.price} · {brewery.hours}
            </p>
          )}
        </div>
        
        <div 
          className={cn(
            "w-[26px] h-[26px] rounded-lg border-2 flex items-center justify-center shrink-0 mt-2 transition-all cursor-pointer"
          )}
          style={{ 
            borderColor: isVisited ? visitedColor : 'var(--border)',
            background: 'transparent'
          }}
          onClick={(e) => { e.stopPropagation(); onToggleVisit() }}
        >
          {isVisited && <CheckIcon size={14} color={visitedColor} strokeWidth={3} />}
        </div>
      </div>
      
      {/* Body */}
      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-in-out pl-[40px]",
        isExpanded ? "max-h-[2000px] opacity-100 pb-6" : "max-h-0 opacity-0"
      )}>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <a 
            href={`tel:${brewery.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 bg-zinc-800 px-2 py-1.5 rounded-lg text-[11px] font-semibold text-zinc-300"
          >
            <PhoneIcon size={12} color="#a1a1aa" />
            {brewery.phone}
          </a>
          {brewery.web && (
            <a 
              href={`https://${brewery.web}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-zinc-800 px-2 py-1.5 rounded-lg text-[11px] font-semibold text-zinc-300"
            >
              <GlobeIcon size={12} color="#a1a1aa" />
              Web
            </a>
          )}
          <a 
            href={`https://maps.google.com/?q=${brewery.q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-zinc-800 px-2 py-1.5 rounded-lg text-[11px] font-semibold text-zinc-300"
          >
            <PinIcon size={12} color="#a1a1aa" />
            Maps
          </a>
        </div>
        
        {/* Beer */}
        {brewery.beer && (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2.5 relative min-h-[22px]">
              <span className="absolute -left-[25px] -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#09090b] p-0.5 rounded">
                <BeerIcon size={15} color="#8a8a92" />
              </span>
              <span className="text-[13px] font-semibold text-zinc-300">Beer</span>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed">{brewery.beer}</p>
          </div>
        )}
        
        {/* Food */}
        {brewery.food && (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2.5 relative min-h-[22px]">
              <span className="absolute -left-[25px] -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#09090b] p-0.5 rounded">
                <UtensilsIcon size={15} color="#8a8a92" />
              </span>
              <span className="text-[13px] font-semibold text-zinc-300">Food</span>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed">{brewery.food}</p>
          </div>
        )}
        
        {/* Guide */}
        {guide && (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2.5 relative min-h-[22px]">
              <span className="absolute -left-[25px] -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#09090b] p-0.5 rounded">
                <BookIcon size={15} color="#8a8a92" />
              </span>
              <span className="text-[13px] font-semibold text-zinc-300">From the guide</span>
            </div>
            <p 
              className="text-[13px] text-zinc-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: guide }}
            />
          </div>
        )}
        
        {/* Warning */}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2.5 relative min-h-[22px]">
            <span className="absolute -left-[25px] -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#09090b] p-0.5 rounded">
              <AlertIcon size={15} color="#f59e0b" />
            </span>
            <span className="text-[13px] font-semibold text-amber-500">Heads up</span>
          </div>
          <p className="text-[13px] text-amber-500/70 leading-relaxed">{brewery.avoid}</p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button 
            onClick={(e) => { e.stopPropagation(); onOpenNote() }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-dashed border-zinc-700 text-zinc-50 text-[13px] font-semibold"
          >
            <PlusIcon size={14} color="#fafafa" />
            Add Note
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleVisit() }}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-dashed text-[13px] font-semibold",
              isVisited 
                ? "border-emerald-600 text-emerald-500" 
                : "border-zinc-700 text-zinc-50"
            )}
          >
            <CheckIcon size={14} color={isVisited ? '#3aab7a' : '#fafafa'} />
            Visited
          </button>
        </div>
      </div>
    </div>
  )
}

// Journal Tab Component
function JournalTab({ 
  notes, 
  journalSort, 
  setJournalSort,
  onEditNote,
  onDeleteNote,
  slideDirection
}: { 
  notes: Record<number, NoteEntry[]>
  journalSort: 'stop' | 'type'
  setJournalSort: (s: 'stop' | 'type') => void
  onEditNote: (breweryId: number, note: NoteEntry) => void
  onDeleteNote: (breweryId: number, noteId: number) => void
  slideDirection: 'left' | 'right'
}) {
  const allNotes: { brew: Brewery | undefined; entry: NoteEntry; brewId: number }[] = []
  
  for (const bid in notes) {
    if (!notes[bid]?.length) continue
    const brewery = BREWERIES.find(b => b.id === Number(bid))
    notes[bid].forEach(entry => {
      allNotes.push({ brew: brewery, entry, brewId: Number(bid) })
    })
  }
  
  const totalCount = allNotes.length

  if (!totalCount) {
    return (
      <div className={cn("flex flex-col items-center justify-center min-h-[calc(100dvh-260px)] text-center animate-in fade-in duration-300", slideDirection === 'right' ? "tab-slide-from-right" : "tab-slide-from-left")}>
        <div className="text-3xl font-bold text-zinc-50 tracking-tight">No notes yet</div>
        <div className="text-[11px] font-medium text-zinc-600 mt-2 tracking-wide">
          Open a stop and tap Add Note to start your notes
        </div>
      </div>
    )
  }

  const noteTypeConfig = {
    beer: { 
      icon: () => <BeerIcon size={19} color="#f59e0b" strokeWidth={2.5} />, 
      label: 'Beer', 
      color: '#f59e0b' 
    },
    food: { 
      icon: () => <UtensilsIcon size={18} color="#a78bfa" />, 
      label: 'Food', 
      color: '#a78bfa' 
    },
    comment: { 
      icon: () => <ChatIcon size={18} color="#1284ED" />, 
      label: 'Note', 
      color: '#1284ED' 
    }
  }

  return (
    <div className={cn("animate-in fade-in duration-300", slideDirection === 'right' ? "tab-slide-from-right" : "tab-slide-from-left")}>
      <div className="flex items-center justify-between mb-5">
        <span className="text-[13px] font-semibold text-zinc-500">
          {totalCount} note{totalCount === 1 ? '' : 's'}
        </span>
        <div className="flex bg-zinc-800/80 rounded-lg p-0.5 border border-zinc-700/50">
          <button
            onClick={() => setJournalSort('stop')}
            className={cn(
              "px-3 py-1 rounded-md text-[11px] font-semibold transition-all",
              journalSort === 'stop' 
                ? "bg-zinc-700 text-zinc-200 shadow-sm" 
                : "text-zinc-500"
            )}
          >
            By Stop
          </button>
          <button
            onClick={() => setJournalSort('type')}
            className={cn(
              "px-3 py-1 rounded-md text-[11px] font-semibold transition-all",
              journalSort === 'type' 
                ? "bg-zinc-700 text-zinc-200 shadow-sm" 
                : "text-zinc-500"
            )}
          >
            By Type
          </button>
        </div>
      </div>

      <SwipeGroup>
      {journalSort === 'stop' ? (
        // Group by stop
        (() => {
          const grouped: Record<number, { brew: Brewery | undefined; entries: NoteEntry[] }> = {}
          allNotes.forEach(n => {
            if (!grouped[n.brewId]) grouped[n.brewId] = { brew: n.brew, entries: [] }
            grouped[n.brewId].entries.push(n.entry)
          })
          
          return Object.entries(grouped).map(([gid, g]) => {
            const isBrew = g.brew?.type === 'brewery'
            return (
              <div key={gid} className="mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  {isBrew 
                    ? <WheatIcon size={15} color="#8a8a92" />
                    : <TreeIcon size={15} color="#8a8a92" />
                  }
                  <span className="text-sm font-semibold text-zinc-300">{g.brew?.name || 'Unknown'}</span>
                  <span className="text-[11px] text-zinc-600">{g.brew?.loc || ''}</span>
                </div>
                {g.entries.map(entry => {
                  const cfg = noteTypeConfig[entry.type] || noteTypeConfig.comment
                  const noteActions = (
                    <>
                      <button
                        onClick={() => onEditNote(Number(gid), entry)}
                        className="flex items-center justify-center px-4 my-2 rounded-lg bg-white/10 backdrop-blur-xl"
                      >
                        <PenIcon size={18} color="#d4d4d8" />
                      </button>
                      <button
                        onClick={() => onDeleteNote(Number(gid), entry.id)}
                        className="flex items-center justify-center px-4 my-2 rounded-lg bg-red-500/20"
                      >
                        <TrashIcon size={18} color="#f87171" />
                      </button>
                    </>
                  )
                  return (
                    <SwipeableItem
                      key={entry.id}
                      actions={noteActions}
                      bgColor={`${cfg.color}10`}
                      className="rounded-xl mb-1.5"
                    >
                      <div className="flex gap-2.5 p-3 items-start">
                        <div className="pt-1.5">{cfg.icon()}</div>
                        <p 
                          className="flex-1 text-[15px] leading-relaxed pt-1.5 break-words"
                          style={{ color: cfg.color, opacity: 0.7 }}
                        >
                          {entry.text}
                        </p>
                      </div>
                    </SwipeableItem>
                  )
                })}
              </div>
            )
          })
        })()
      ) : (
        // Group by type
        (['beer', 'food', 'comment'] as const).map(type => {
          const items = allNotes.filter(n => n.entry.type === type)
          if (!items.length) return null
          const cfg = noteTypeConfig[type]
          
          return (
            <div key={type} className="mb-6">
              <div className="flex items-center gap-2 mb-2.5">
                {cfg.icon()}
                <span className="text-sm font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                <span className="text-[11px] text-zinc-600">{items.length}</span>
              </div>
              {items.map(n => {
                const typeActions = (
                  <>
                    <button
                      onClick={() => onEditNote(n.brewId, n.entry)}
                      className="flex items-center justify-center px-4 my-2 rounded-lg bg-white/10 backdrop-blur-xl"
                    >
                      <PenIcon size={18} color="#d4d4d8" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(n.brewId, n.entry.id)}
                      className="flex items-center justify-center px-4 my-2 rounded-lg bg-red-500/20"
                    >
                      <TrashIcon size={18} color="#f87171" />
                    </button>
                  </>
                )
                return (
                  <SwipeableItem
                    key={n.entry.id}
                    actions={typeActions}
                    bgColor="#18181b"
                    className="rounded-xl mb-1.5"
                  >
                    <div className="flex gap-2.5 p-3 items-center">
                      <div className="flex-1 pt-1">
                        <div className="text-[11px] font-medium text-zinc-600 mb-0.5">
                          {n.brew?.name} · {n.brew?.loc}
                        </div>
                        <p className="text-[15px] text-zinc-500 break-words">{n.entry.text}</p>
                      </div>
                    </div>
                  </SwipeableItem>
                )
              })}
            </div>
          )
        })
      )}
      </SwipeGroup>
    </div>
  )
}

// Nav Button Component
function NavButton({ 
  icon, 
  label, 
  active, 
  onClick,
  align = 'start'
}: { 
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  align?: 'start' | 'end'
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col gap-1.5 py-2 items-center"
      )}
    >
      {icon}
      <span 
        className="text-[10px] font-semibold tracking-wider uppercase"
        style={{ color: active ? '#fafafa' : '#52525b' }}
      >
        {label}
      </span>
    </button>
  )
}

// Modal Component – centered dialog with blurred backdrop and rounded corners
function Modal({ 
  open, 
  onClose, 
  children 
}: { 
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-zinc-900 rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[85dvh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

// SwipeGroup context – ensures only one SwipeableItem is open at a time
type SwipeGroupEntry = { id: symbol; close: () => void }
const SwipeGroupCtx = createContext<React.MutableRefObject<SwipeGroupEntry | null> | null>(null)

function SwipeGroup({ children }: { children: React.ReactNode }) {
  const activeRef = useRef<SwipeGroupEntry | null>(null)
  return <SwipeGroupCtx.Provider value={activeRef}>{children}</SwipeGroupCtx.Provider>
}

// SwipeableItem Component – swipe left on mobile to reveal actions, hover on desktop
function SwipeableItem({
  children,
  actions,
  actionWidth = 120,
  bgColor = '#18181b',
  className
}: {
  children: React.ReactNode
  actions: React.ReactNode
  actionWidth?: number
  bgColor?: string
  className?: string
}) {
  const [offset, setOffset] = useState(0)
  const [snapping, setSnapping] = useState(false)
  const startXRef = useRef(0)
  const startOffRef = useRef(0)
  const idRef = useRef(Symbol())
  const activeRef = useContext(SwipeGroupCtx)

  const snap = (to: number) => {
    setSnapping(true)
    setOffset(to)
  }

  // 0 = closed, 1 = fully open
  const progress = Math.min(1, Math.abs(offset) / actionWidth)
  const isOpen = offset <= -actionWidth

  return (
    <div
      className={cn('relative overflow-hidden group', className)}
      onTouchStart={e => {
        // Close any other open item in the same group
        if (activeRef?.current && activeRef.current.id !== idRef.current) {
          activeRef.current.close()
          activeRef.current = null
        }
        setSnapping(false)
        startXRef.current = e.touches[0].clientX
        startOffRef.current = offset
      }}
      onTouchMove={e => {
        const dx = e.touches[0].clientX - startXRef.current
        const newOff = Math.max(-actionWidth, Math.min(0, startOffRef.current + dx))
        // Only slide on leftward swipe or when already open
        if (newOff < 0 || startOffRef.current < 0) setOffset(newOff)
      }}
      onTouchEnd={() => {
        const target = offset < -(actionWidth / 2) ? -actionWidth : 0
        snap(target)
        if (activeRef) {
          if (target < 0) {
            activeRef.current = { id: idRef.current, close: () => snap(0) }
          } else if (activeRef.current?.id === idRef.current) {
            activeRef.current = null
          }
        }
      }}
    >
      {/* Mobile: action buttons slide in from the right edge of the screen */}
      <div
        className="sm:hidden absolute inset-y-0 right-0 flex flex-row items-stretch gap-2 px-2"
        style={{
          width: actionWidth,
          transform: `translateX(calc(${(1 - progress) * 100}% - ${progress * 4}px))`,
          opacity: progress,
          transition: snapping ? 'transform 0.2s ease, opacity 0.2s ease' : 'none',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 1,
        }}
      >
        {actions}
      </div>

      {/* Content stays in place; fades as actions are revealed */}
      <div
        style={{
          background: bgColor,
          opacity: 1 - progress * 0.85,
          transition: snapping ? 'opacity 0.2s ease' : 'none',
        }}
      >
        <div className="flex items-stretch">
          <div className="flex-1 min-w-0">
            {children}
          </div>
          {/* Desktop only: action buttons slide in from right on hover */}
          <div className="hidden sm:flex items-stretch gap-2 translate-x-3 opacity-0 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out px-2 shrink-0">
            {actions}
          </div>
        </div>
      </div>
    </div>
  )
}
