type IconProps = { name: string; className?: string }

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Minimal hand-drawn line-icon set used across category cards and the mega-menu. */
export default function CategoryIcon({ name, className = 'h-5 w-5' }: IconProps) {
  const props = { className, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' }

  switch (name) {
    case 'grid':
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" {...common} />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" {...common} />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" {...common} />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" {...common} />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...props}>
          <path d="M5 19c0-8 4.5-13.5 14-14-1 9-6 13.5-14 14Z" {...common} />
          <path d="M5 19c2-3.5 5-6.5 9.5-9.5" {...common} />
        </svg>
      )
    case 'stomach':
      return (
        <svg {...props}>
          <path d="M8 4c0 3-3 3-3 7a7 7 0 0 0 14 0c0-3.5-2-4-2-7" {...common} />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3.5 19 6v6c0 4.5-3 7-7 8.5-4-1.5-7-4-7-8.5V6l7-2.5Z" {...common} />
        </svg>
      )
    case 'moon':
      return (
        <svg {...props}>
          <path d="M19 14.5A8 8 0 1 1 9.5 5a6.5 6.5 0 0 0 9.5 9.5Z" {...common} />
        </svg>
      )
    case 'drop':
      return (
        <svg {...props}>
          <path d="M12 3s6 7 6 11.5a6 6 0 0 1-12 0C6 10 12 3 12 3Z" {...common} />
        </svg>
      )
    case 'heart':
      return (
        <svg {...props}>
          <path d="M12 20s-7.5-4.6-9.8-9.5C.7 6.8 3 4 6.2 4c2 0 3.6 1.2 5.8 3 2.2-1.8 3.8-3 5.8-3 3.2 0 5.5 2.8 4 6.5C19.5 15.4 12 20 12 20Z" {...common} />
        </svg>
      )
    case 'flower':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="2.4" {...common} />
          <circle cx="12" cy="6" r="2.6" {...common} />
          <circle cx="12" cy="18" r="2.6" {...common} />
          <circle cx="6" cy="12" r="2.6" {...common} />
          <circle cx="18" cy="12" r="2.6" {...common} />
        </svg>
      )
    case 'bone':
      return (
        <svg {...props}>
          <circle cx="6" cy="9" r="2.2" {...common} />
          <circle cx="6" cy="15" r="2.2" {...common} />
          <circle cx="18" cy="9" r="2.2" {...common} />
          <circle cx="18" cy="15" r="2.2" {...common} />
          <line x1="7.6" y1="10.6" x2="16.4" y2="13.4" {...common} />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...props}>
          <path d="M12 3c.7 3.7 2.3 5.3 6 6-3.7.7-5.3 2.3-6 6-.7-3.7-2.3-5.3-6-6 3.7-.7 5.3-2.3 6-6Z" {...common} />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...props}>
          <path d="M13 3 5 13.5h5.5L10 21l8-11h-5.5L13 3Z" {...common} />
        </svg>
      )
    case 'flame':
      return (
        <svg {...props}>
          <path d="M12 3c1.5 3-3 5-3 9a5 5 0 0 0 10 0c0-1.5-.8-2.5-1.5-3.5.2 2-1 3-1 3 .5-3-1.5-5-4.5-8.5Z" {...common} />
        </svg>
      )
    case 'dumbbell':
      return (
        <svg {...props}>
          <line x1="6" y1="12" x2="18" y2="12" {...common} />
          <rect x="2.5" y="9" width="3" height="6" rx="1" {...common} />
          <rect x="18.5" y="9" width="3" height="6" rx="1" {...common} />
        </svg>
      )
    case 'box':
      return (
        <svg {...props}>
          <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" {...common} />
          <path d="M4 8.5V16l8 4.5 8-4.5V8.5" {...common} />
          <line x1="12" y1="13" x2="12" y2="20.5" {...common} />
        </svg>
      )
    case 'star':
      return (
        <svg {...props}>
          <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2L3 9.5l6.4-.6L12 3Z" {...common} />
        </svg>
      )
    case 'tag':
      return (
        <svg {...props}>
          <path d="M11.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v6.5a1.5 1.5 0 0 0 .44 1.06l9 9a1.5 1.5 0 0 0 2.12 0l6.5-6.5a1.5 1.5 0 0 0 0-2.12l-9-9a1.5 1.5 0 0 0-1.06-.44Z" {...common} />
          <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'crown':
      return (
        <svg {...props}>
          <path d="M3.5 8.5 8 11l4-6.5L16 11l4.5-2.5L19 18H5L3.5 8.5Z" {...common} />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" {...common} />
        </svg>
      )
  }
}
