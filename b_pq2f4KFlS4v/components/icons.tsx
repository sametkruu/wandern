interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

const createIcon = (path: string, defaults: Partial<IconProps> = {}) => {
  return function Icon({ size = defaults.size ?? 16, color = defaults.color ?? 'currentColor', strokeWidth = defaults.strokeWidth ?? 2, className }: IconProps) {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
        style={{ flexShrink: 0 }}
        dangerouslySetInnerHTML={{ __html: path }}
      />
    )
  }
}

export const BeerIcon = createIcon(
  '<path d="M17 11h1a3 3 0 010 6h-1"/><path d="M9 12v6M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 010-5c.78 0 1.57.5 2.5.5S9.44 3 11 3s2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 010 5c-.78 0-1.5-.5-2.5-.5z"/><path d="M5 8v12a2 2 0 002 2h8a2 2 0 002-2V8"/>',
  { size: 15, strokeWidth: 2.5 }
)

export const WheatIcon = createIcon(
  '<path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0z"/><path d="M19.47 9.47 21 11l-1.53-1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0z"/>',
  { size: 15, strokeWidth: 2.5 }
)

export const TreeIcon = createIcon(
  '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  { size: 15, strokeWidth: 2.5 }
)

export const FootIcon = createIcon(
  '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 11-4 0z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 104 0z"/>',
  { size: 13 }
)

export const ClockIcon = createIcon(
  '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  { size: 12 }
)

export const PhoneIcon = createIcon(
  '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>',
  { size: 12 }
)

export const GlobeIcon = createIcon(
  '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/>',
  { size: 12 }
)

export const PinIcon = createIcon(
  '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/>',
  { size: 16, strokeWidth: 2.5 }
)

export const AlertIcon = createIcon(
  '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  { size: 14 }
)

export const UtensilsIcon = createIcon(
  '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  { size: 14 }
)

export const CheckIcon = createIcon(
  '<path d="M20 6L9 17l-5-5"/>',
  { size: 14, strokeWidth: 3 }
)

export const CheckCircleIcon = ({ size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill={color} stroke={color} strokeWidth="2" />
    <path d="M16 9l-5 5-3-3" stroke="#000" fill="none" strokeWidth="2" />
  </svg>
)

export const ChatIcon = createIcon(
  '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  { size: 14 }
)

export const BookIcon = createIcon(
  '<path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20"/>',
  { size: 14 }
)

export const ChevronIcon = createIcon(
  '<path d="M6 9l6 6 6-6"/>',
  { size: 16 }
)

export const ChevronRightIcon = createIcon(
  '<path d="M9 18l6-6-6-6"/>',
  { size: 27 }
)

export const PenIcon = createIcon(
  '<path d="M17 3a2.85 2.85 0 114 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  { size: 16 }
)

export const TrashIcon = createIcon(
  '<path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>',
  { size: 16 }
)

export const PlusIcon = createIcon(
  '<path d="M12 5v14M5 12h14"/>',
  { size: 14, strokeWidth: 2.5 }
)

export const CloseIcon = createIcon(
  '<path d="M18 6L6 18M6 6l12 12"/>',
  { size: 18 }
)

export const CompassIcon = createIcon(
  '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88"/>',
  { size: 22, strokeWidth: 2.5 }
)

export const BackpackIcon = createIcon(
  '<path d="M4 20V10a4 4 0 014-4h8a4 4 0 014 4v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"/><path d="M8 21v-5a2 2 0 012-2h4a2 2 0 012 2v5"/>',
  { size: 22 }
)
