"use client"

import { useState, useEffect, useCallback } from 'react'
import { DEFAULT_PACKING_LIST } from '@/lib/data'

// Types
export interface NoteEntry {
  id: number
  type: 'beer' | 'food' | 'comment'
  text: string
}

export interface PackItem {
  id: string
  text: string
}

export interface PackCategory {
  cat: string
  items: PackItem[]
}

// LocalStorage helpers
function getLS<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

function setLS<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Silently fail
  }
}

// Custom hook for visited breweries
export function useVisited() {
  const [visited, setVisitedState] = useState<Set<number>>(new Set())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = getLS<number[]>('bt_visited', [])
    setVisitedState(new Set(stored))
    setLoaded(true)
  }, [])

  const setVisited = useCallback((newSet: Set<number>) => {
    setVisitedState(newSet)
    setLS('bt_visited', [...newSet])
  }, [])

  const toggleVisited = useCallback((id: number) => {
    setVisitedState(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      setLS('bt_visited', [...newSet])
      return newSet
    })
  }, [])

  return { visited, setVisited, toggleVisited, loaded }
}

// Custom hook for notes
export function useNotes() {
  const [notes, setNotesState] = useState<Record<number, NoteEntry[]>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = getLS<Record<number, NoteEntry[]>>('bt_notes', {})
    setNotesState(stored)
    setLoaded(true)
  }, [])

  const setNotes = useCallback((newNotes: Record<number, NoteEntry[]>) => {
    setNotesState(newNotes)
    setLS('bt_notes', newNotes)
  }, [])

  const addNote = useCallback((breweryId: number, note: Omit<NoteEntry, 'id'>) => {
    setNotesState(prev => {
      const newNotes = { ...prev }
      if (!newNotes[breweryId]) newNotes[breweryId] = []
      newNotes[breweryId] = [...newNotes[breweryId], { ...note, id: Date.now() }]
      setLS('bt_notes', newNotes)
      return newNotes
    })
  }, [])

  const updateNote = useCallback((breweryId: number, noteId: number, updates: Partial<NoteEntry>) => {
    setNotesState(prev => {
      const newNotes = { ...prev }
      if (newNotes[breweryId]) {
        newNotes[breweryId] = newNotes[breweryId].map(n => 
          n.id === noteId ? { ...n, ...updates } : n
        )
        setLS('bt_notes', newNotes)
      }
      return newNotes
    })
  }, [])

  const deleteNote = useCallback((breweryId: number, noteId: number) => {
    setNotesState(prev => {
      const newNotes = { ...prev }
      if (newNotes[breweryId]) {
        newNotes[breweryId] = newNotes[breweryId].filter(n => n.id !== noteId)
        if (newNotes[breweryId].length === 0) {
          delete newNotes[breweryId]
        }
        setLS('bt_notes', newNotes)
      }
      return newNotes
    })
  }, [])

  return { notes, setNotes, addNote, updateNote, deleteNote, loaded }
}

// Custom hook for packing list
export function usePacking() {
  const [packed, setPackedState] = useState<Set<string>>(new Set())
  const [packList, setPackListState] = useState<PackCategory[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const storedPacked = getLS<string[]>('bt_packed', [])
    setPackedState(new Set(storedPacked))

    const storedList = getLS<PackCategory[] | null>('bt_packlist', null)
    if (storedList) {
      setPackListState(storedList)
    } else {
      // Initialize with default list
      const defaultList: PackCategory[] = DEFAULT_PACKING_LIST.map((g, gi) => ({
        cat: g.cat,
        items: g.items.map((t, ii) => ({ id: `${gi}_${ii}`, text: t }))
      }))
      setPackListState(defaultList)
      setLS('bt_packlist', defaultList)
    }
    setLoaded(true)
  }, [])

  const togglePacked = useCallback((id: string) => {
    setPackedState(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      setLS('bt_packed', [...newSet])
      return newSet
    })
  }, [])

  const updatePackList = useCallback((newList: PackCategory[]) => {
    setPackListState(newList)
    setLS('bt_packlist', newList)
  }, [])

  const addPackItem = useCallback((categoryIndex: number, text: string) => {
    setPackListState(prev => {
      const newList = [...prev]
      if (newList[categoryIndex]) {
        newList[categoryIndex] = {
          ...newList[categoryIndex],
          items: [...newList[categoryIndex].items, { id: `p${Date.now()}`, text }]
        }
        setLS('bt_packlist', newList)
      }
      return newList
    })
  }, [])

  const editPackItem = useCallback((itemId: string, newText: string) => {
    setPackListState(prev => {
      const newList = prev.map(cat => ({
        ...cat,
        items: cat.items.map(item => 
          item.id === itemId ? { ...item, text: newText } : item
        )
      }))
      setLS('bt_packlist', newList)
      return newList
    })
  }, [])

  const deletePackItem = useCallback((itemId: string) => {
    setPackListState(prev => {
      const newList = prev.map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      })).filter(cat => cat.items.length > 0)
      setLS('bt_packlist', newList)
      return newList
    })
    // Also remove from packed
    setPackedState(prev => {
      const newSet = new Set(prev)
      newSet.delete(itemId)
      setLS('bt_packed', [...newSet])
      return newSet
    })
  }, [])

  const addCategory = useCallback((name: string) => {
    setPackListState(prev => {
      const newList = [...prev, { cat: name, items: [] }]
      setLS('bt_packlist', newList)
      return newList
    })
  }, [])

  return { 
    packed, 
    packList, 
    togglePacked, 
    updatePackList, 
    addPackItem, 
    editPackItem, 
    deletePackItem,
    addCategory,
    loaded 
  }
}
