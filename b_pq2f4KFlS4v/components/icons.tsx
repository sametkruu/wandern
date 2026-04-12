import {
  Beer, Wheat, Trees, Footprints, Clock, Phone, Globe, MapPin,
  TriangleAlert, Utensils, Check, MessageSquare, Book, ChevronDown,
  ChevronRight, Pen, Trash2, Plus, X, Compass, Backpack
} from 'lucide-react'

export const BeerIcon = Beer
export const WheatIcon = Wheat
export const TreeIcon = Trees
export const FootIcon = Footprints
export const ClockIcon = Clock
export const PhoneIcon = Phone
export const GlobeIcon = Globe
export const PinIcon = MapPin
export const AlertIcon = TriangleAlert
export const UtensilsIcon = Utensils
export const CheckIcon = Check
export const ChatIcon = MessageSquare
export const BookIcon = Book
export const ChevronIcon = ChevronDown
export const ChevronRightIcon = ChevronRight
export const PenIcon = Pen
export const TrashIcon = Trash2
export const PlusIcon = Plus
export const CloseIcon = X
export const CompassIcon = Compass
export const BackpackIcon = Backpack

export const CheckCircleIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill={color} stroke={color} strokeWidth="2" />
    <path d="M16 9l-5 5-3-3" stroke="#000" fill="none" strokeWidth="2" />
  </svg>
)
