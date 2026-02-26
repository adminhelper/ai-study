import { useState } from 'react';
import { ChevronDown, ExternalLink, Check } from 'lucide-react';
import { roadmapData } from '../data/roadmap';
import { useProgress } from '../hooks/useProgress';
import ClaudeCodeDeep from '../components/ClaudeCodeDeep';


const diffColors = {
  beginner: { label: '입문', emoji: '🟢', iconBg: 'var(--color-accent-glow)', iconBorder: 'rgba(249,115,22,0.18)' },
  intermediate: { label: '중급', emoji: '🔵', iconBg: 'var(--color-accent2-glow)', iconBorder: 'rgba(56,189,248,0.18)' },
  advanced: { label: '고급', emoji: '🟣', iconBg: 'rgba(167,139,250,0.10)', iconBorder: 'rgba(167,139,250,0.18)' },
};

export default function Roadmap() {
  const [tab, setTab] = useState<'roadmap' | 'deep'>('roadmap');
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set());
  const { toggle: toggleDone, isCompleted, getStageProgress, totalProgress } = useProgress();
  const total = totalProgress(roadmapData);

  const flip = (key: string) => setOpenTopics((p) => { const n = new Set(p); n.has(key) ? n.delete(key) : n.add(key); return n; });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="mx-auto max-w-[1060px] px-5 py-16">
      {/* Header */}
      <div className="mb-1 text-xs uppercase tracking-widest text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>Roadmap</div>
      <h1 className="mb-1 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>학습 로드맵</h1>
      <p className="mb-6 text-sm text-[var(--color-text-dim)]">순서대로 따라가며 실습하세요. 진행률이 자동 저장됩니다.</p>

      {/* Tab Bar */}
      <div className="mb-10 flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-1" style={{ width: 'fit-content' }}>
        {([['roadmap', '전체 로드맵'], ['deep', 'Claude Code 심화']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className="rounded-md px-4 py-2 text-sm font-medium transition-all"
            style={{
              fontFamily: 'var(--font-display)',
              background: tab === key ? 'var(--color-accent)' : 'transparent',
              color: tab === key ? 'white' : 'var(--color-text-muted)',
            }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'deep' && <ClaudeCodeDeep />}
      {tab === 'roadmap' && (
      <>

      {/* Overview Grid */}
      <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roadmapData.map((s) => {
          const p = getStageProgress(s.id, s.topics.length);
          return (
            <button key={s.id} onClick={() => scrollTo(`sec-${s.id}`)}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]">
              <div className="mb-2 text-2xl font-bold leading-none text-[var(--color-border-hover)] transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)', color: p.pct === 100 ? 'var(--color-green)' : undefined }}>
                {s.num}
              </div>
              <div className="mb-0.5 text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{s.title}</div>
              <div className="mb-2 text-xs text-[var(--color-text-muted)]">{s.description}</div>
              <div className="mb-2 text-[0.68rem] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>⏱ {s.duration}</div>
              <div className="h-[3px] overflow-hidden rounded-full bg-[var(--color-border)]">
                <div className="h-full rounded-full bg-[var(--color-green)] transition-all duration-500" style={{ width: `${p.pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>
      <p className="mb-16 text-center text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>완료: {total.done} / {total.total}</p>

      {/* Module Sections */}
      <div className="space-y-20">
        {roadmapData.map((stage) => {
          const prog = getStageProgress(stage.id, stage.topics.length);
          return (
            <section key={stage.id} id={`sec-${stage.id}`} className="scroll-mt-24 border-b border-[var(--color-border)] pb-12">
              {/* Section title bar */}
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs tracking-widest text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>MODULE {stage.num}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-20" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>{stage.title}</h2>
              <p className="mb-2 max-w-[600px] text-sm text-[var(--color-text-dim)]">{stage.description}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(52,211,153,0.18)] bg-[var(--color-green-dim)] px-3 py-1 text-xs text-[var(--color-green)]">⏱ {stage.duration}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(52,211,153,0.18)] bg-[var(--color-green-dim)] px-3 py-1 text-xs text-[var(--color-green)]">{prog.done}/{prog.total} 완료</span>
              </div>

              {/* Topic cards */}
              <div className="space-y-3">
                {stage.topics.map((topic, ti) => {
                  const k = `${stage.id}-${ti}`;
                  const open = openTopics.has(k);
                  const done = isCompleted(k);
                  const d = diffColors[topic.difficulty];

                  return (
                    <div key={k} className="overflow-hidden rounded-xl border transition-all" style={{
                      borderColor: done ? 'rgba(52,211,153,0.2)' : open ? 'var(--color-border-hover)' : 'var(--color-border)',
                      background: done ? 'rgba(52,211,153,0.02)' : 'var(--color-bg-card)',
                    }}>
                      <div className="flex items-center">
                        {/* Check */}
                        <button onClick={() => toggleDone(k)} className="px-4 py-3.5 transition-colors hover:bg-[rgba(255,255,255,0.02)]" title={done ? '완료 취소' : '완료'}>
                          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.5px] transition-all" style={{
                            borderColor: done ? 'var(--color-green)' : 'var(--color-border-hover)',
                            background: done ? 'var(--color-green)' : 'transparent',
                          }}>
                            {done && <Check size={11} strokeWidth={3} color="white" />}
                          </div>
                        </button>
                        {/* Expand */}
                        <button onClick={() => flip(k)} className="flex flex-1 items-center gap-3 py-3.5 pr-4 text-left transition-colors hover:bg-[rgba(255,255,255,0.015)]">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm" style={{ background: d.iconBg, border: `1px solid ${d.iconBorder}` }}>
                            {d.emoji}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold" style={{
                              fontFamily: 'var(--font-display)',
                              color: done ? 'var(--color-text-muted)' : 'var(--color-text)',
                              textDecoration: done ? 'line-through' : 'none',
                            }}>{topic.title}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">{d.label}</div>
                          </div>
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300" style={{
                            transform: open ? 'rotate(180deg)' : 'rotate(0)',
                            borderColor: open ? 'var(--color-accent)' : 'var(--color-border)',
                            color: open ? 'var(--color-accent)' : 'var(--color-text-muted)',
                          }}>
                            <ChevronDown size={13} />
                          </div>
                        </button>
                      </div>

                      {open && (
                        <div className="border-t border-[var(--color-border)] px-5 py-4">
                          <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-dim)]">{topic.description}</p>
                          {topic.resources.length > 0 && (
                            <div>
                              <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                                <span className="h-3 w-[3px] rounded-sm bg-[var(--color-accent)]" />학습 자료
                              </h4>
                              <div className="space-y-1">
                                {topic.resources.map((r, ri) => (
                                  <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-accent2)] transition-colors hover:bg-[var(--color-accent2-glow)]">
                                    <ExternalLink size={13} className="flex-shrink-0" />{r.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Completion */}
              <div className="mt-5 flex items-center justify-between border-t border-dashed border-[var(--color-border)] pt-4">
                <span className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{prog.done}/{prog.total} 완료</span>
                {prog.pct === 100 && <span className="inline-flex items-center gap-1 text-xs text-[var(--color-green)]" style={{ fontFamily: 'var(--font-mono)' }}><Check size={14} />모듈 완료!</span>}
              </div>
            </section>
          );
        })}
      </div>
      </>
      )}
    </div>
  );
}
