import { useState } from 'react';
import { ChevronDown, ExternalLink, Check } from 'lucide-react';
import { claudeCodeDeepData } from '../data/claudeCodeDeep';
import { useProgress } from '../hooks/useProgress';

const diffColors = {
  beginner: { label: '입문', emoji: '🟢', iconBg: 'var(--color-accent-glow)', iconBorder: 'rgba(249,115,22,0.18)' },
  intermediate: { label: '중급', emoji: '🔵', iconBg: 'var(--color-accent2-glow)', iconBorder: 'rgba(56,189,248,0.18)' },
  advanced: { label: '고급', emoji: '🟣', iconBg: 'rgba(167,139,250,0.10)', iconBorder: 'rgba(167,139,250,0.18)' },
};

export default function ClaudeCodeDeep() {
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set());
  const { toggle: toggleDone, isCompleted } = useProgress();

  const flip = (key: string) => setOpenTopics((p) => { const n = new Set(p); n.has(key) ? n.delete(key) : n.add(key); return n; });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Progress calculation
  const allTopics = claudeCodeDeepData.flatMap((sec) => sec.topics.map((_, ti) => `deep-${sec.id}-${ti}`));
  const doneCount = allTopics.filter((k) => isCompleted(k)).length;

  const getSectionProgress = (sectionId: string, topicCount: number) => {
    let done = 0;
    for (let i = 0; i < topicCount; i++) {
      if (isCompleted(`deep-${sectionId}-${i}`)) done++;
    }
    return { done, total: topicCount, pct: topicCount === 0 ? 0 : Math.round((done / topicCount) * 100) };
  };

  return (
    <>
      {/* Overview Grid */}
      <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {claudeCodeDeepData.map((sec) => {
          const p = getSectionProgress(sec.id, sec.topics.length);
          return (
            <button key={sec.id} onClick={() => scrollTo(`dsec-${sec.id}`)}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]">
              <div className="mb-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{sec.title}</div>
              <div className="mb-2 text-xs text-[var(--color-text-muted)]">{sec.description}</div>
              <div className="mb-2 text-[0.68rem] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{sec.topics.length}개 토픽</div>
              <div className="h-[3px] overflow-hidden rounded-full bg-[var(--color-border)]">
                <div className="h-full rounded-full bg-[var(--color-green)] transition-all duration-500" style={{ width: `${p.pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>
      <p className="mb-16 text-center text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>완료: {doneCount} / {allTopics.length}</p>

      {/* Section Details */}
      <div className="space-y-20">
        {claudeCodeDeepData.map((sec) => {
          const prog = getSectionProgress(sec.id, sec.topics.length);
          return (
            <section key={sec.id} id={`dsec-${sec.id}`} className="scroll-mt-24 border-b border-[var(--color-border)] pb-12">
              {/* Section title */}
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs tracking-widest text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>{sec.title.toUpperCase()}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-20" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>{sec.title}</h2>
              <p className="mb-2 max-w-[600px] text-sm text-[var(--color-text-dim)]">{sec.description}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(52,211,153,0.18)] bg-[var(--color-green-dim)] px-3 py-1 text-xs text-[var(--color-green)]">{prog.done}/{prog.total} 완료</span>
              </div>

              {/* Topic cards */}
              <div className="space-y-3">
                {sec.topics.map((topic, ti) => {
                  const k = `deep-${sec.id}-${ti}`;
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
                {prog.pct === 100 && <span className="inline-flex items-center gap-1 text-xs text-[var(--color-green)]" style={{ fontFamily: 'var(--font-mono)' }}><Check size={14} />섹션 완료!</span>}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
