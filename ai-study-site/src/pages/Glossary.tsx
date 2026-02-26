import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { glossaryData, categoryLabels, type GlossaryCategory } from '../data/glossary';

const categories = Object.entries(categoryLabels) as [GlossaryCategory, string][];

const catColors: Record<GlossaryCategory, { color: string; bg: string }> = {
  core: { color: 'var(--color-accent)', bg: 'var(--color-accent-glow)' },
  model: { color: 'var(--color-accent2)', bg: 'var(--color-accent2-glow)' },
  technique: { color: 'var(--color-accent3)', bg: 'rgba(167,139,250,0.10)' },
  tool: { color: 'var(--color-yellow)', bg: 'rgba(251,191,36,0.10)' },
  ethics: { color: 'var(--color-red)', bg: 'rgba(248,113,113,0.10)' },
};

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<GlossaryCategory | 'all'>('all');

  const filtered = useMemo(() =>
    glossaryData.filter((t) => {
      const mc = active === 'all' || t.category === active;
      const ms = !search || t.term.includes(search) || t.termEn.toLowerCase().includes(search.toLowerCase()) || t.definition.includes(search);
      return mc && ms;
    }), [search, active]);

  return (
    <div className="mx-auto max-w-[1060px] px-5 py-16">
      <div className="mb-1 text-xs uppercase tracking-widest text-[var(--color-accent2)]" style={{ fontFamily: 'var(--font-mono)' }}>Glossary</div>
      <h1 className="mb-1 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>AI 용어 사전</h1>
      <p className="mb-8 text-sm text-[var(--color-text-dim)]">꼭 알아야 할 AI 핵심 용어들을 정리했습니다.</p>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input type="text" placeholder="용어 검색..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-accent2)]" />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button onClick={() => setActive('all')}
          className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
          style={{ fontFamily: 'var(--font-mono)', background: active === 'all' ? 'var(--color-accent-glow)' : 'transparent', color: active === 'all' ? 'var(--color-accent)' : 'var(--color-text-muted)', border: `1px solid ${active === 'all' ? 'rgba(249,115,22,0.25)' : 'var(--color-border)'}` }}>
          전체
        </button>
        {categories.map(([k, label]) => {
          const c = catColors[k]; const on = active === k;
          return (
            <button key={k} onClick={() => setActive(k)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ fontFamily: 'var(--font-mono)', background: on ? c.bg : 'transparent', color: on ? c.color : 'var(--color-text-muted)', border: `1px solid ${on ? c.color + '40' : 'var(--color-border)'}` }}>
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => {
          const c = catColors[t.category];
          return (
            <div key={t.termEn} className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold">{t.term}</h3>
                  <p className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{t.termEn}</p>
                </div>
                <span className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium" style={{ background: c.bg, color: c.color, fontFamily: 'var(--font-mono)' }}>{categoryLabels[t.category]}</span>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-dim)]">{t.definition}</p>
              {t.example && <p className="rounded-lg bg-[var(--color-bg-surface)] px-3 py-2 text-xs text-[var(--color-text-muted)]">💡 {t.example}</p>}
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="py-16 text-center text-[var(--color-text-muted)]">검색 결과가 없습니다.</p>}
    </div>
  );
}
