'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/decisions', label: 'Decisions' },
  { href: '/trades', label: 'Trades' },
  { href: '/positions', label: 'Positions' },
  { href: '/costs', label: 'Costs' },
  { href: '/strategy', label: 'Strategy' },
  { href: '/reports', label: 'Reports' },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="border-b border-[#2a2d3a] bg-[#1a1d27] px-6 py-3 flex items-center gap-8">
      <span className="font-bold text-white text-lg tracking-tight">🤖 AlphaBot</span>
      <div className="flex gap-6">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm font-medium transition-colors ${
              pathname === l.href ? 'text-white' : 'text-[#8b8fa8] hover:text-white'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
