import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/roadmap', label: '로드맵' },
  { to: '/glossary', label: '용어' },
  { to: '/community', label: '커뮤니티' },
  { to: '/news', label: '뉴스' },
  { to: '/showcase', label: '노하우' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div
        className="fixed left-0 top-0 z-[100] h-[3px]"
        style={{
          width: `${scrollPct}%`,
          background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent2))',
          boxShadow: '0 0 14px var(--color-accent)',
          transition: 'width 0.15s',
        }}
      />

      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-deep)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1060px] items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-1.5 text-base font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            AI <span className="text-[var(--color-accent)]">A-Z</span>
          </Link>

          <nav className="hidden gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-1.5 text-[0.8rem] font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--color-accent-glow)] text-[var(--color-accent)]'
                      : 'text-[var(--color-text-dim)] hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text)]'
                  }`
                }
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-[var(--color-border)] bg-[var(--color-bg-deep)] px-5 py-2 md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--color-accent-glow)] text-[var(--color-accent)]'
                      : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
                  }`
                }
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
