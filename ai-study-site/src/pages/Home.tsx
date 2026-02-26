import { Link } from 'react-router-dom';
import { Map, BookOpen, Users, Newspaper, Lightbulb } from 'lucide-react';
import { roadmapData } from '../data/roadmap';
import { useProgress } from '../hooks/useProgress';


const sectionCards = [
  { to: '/roadmap', icon: Map, title: '로드맵', desc: 'AI 시작부터 자동화까지 단계별 학습', color: 'var(--color-accent)', bg: 'var(--color-accent-glow)' },
  { to: '/glossary', icon: BookOpen, title: '용어', desc: '꼭 알아야 할 AI 핵심 용어 사전', color: 'var(--color-accent2)', bg: 'var(--color-accent2-glow)' },
  { to: '/community', icon: Users, title: '커뮤니티', desc: 'AI 학습자를 위한 커뮤니티 모음', color: 'var(--color-accent3)', bg: 'rgba(167,139,250,0.10)' },
  { to: '/news', icon: Newspaper, title: '뉴스', desc: '최신 AI 뉴스와 정보 소스', color: 'var(--color-green)', bg: 'var(--color-green-dim)' },
  { to: '/showcase', icon: Lightbulb, title: '노하우', desc: 'AI 활용 팁, 프롬프트, 자동화 레시피', color: '#f472b6', bg: 'rgba(244,114,182,0.10)' },
];

export default function Home() {
  const { getStageProgress, totalProgress } = useProgress();
  const total = totalProgress(roadmapData);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden text-center">
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.025) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,black,transparent)',
        }} />
        <div className="pointer-events-none absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%,rgba(249,115,22,0.07) 0%,transparent 70%),radial-gradient(ellipse 60% 50% at 20% 80%,rgba(56,189,248,0.04) 0%,transparent 60%)',
        }} />

        <div className="relative z-10 max-w-[800px] px-5">
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs animate-[fadeInDown_0.8s_ease]"
            style={{ fontFamily: 'var(--font-mono)', borderColor: 'rgba(249,115,22,0.25)', background: 'var(--color-accent-glow)', color: 'var(--color-accent)' }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-[pulseDot_2s_infinite]" />
            2026 · AI 학습 가이드
          </div>

          <h1 className="mb-4 animate-[fadeInUp_0.8s_ease_0.2s_both]" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,8vw,6.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em',
          }}>
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#fb923c] bg-clip-text text-transparent">AI</span>{' '}
            <span className="text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.65em' }}>A-Z</span>
          </h1>

          <p className="mx-auto mb-10 max-w-[540px] text-lg font-light text-[var(--color-text-dim)] animate-[fadeInUp_0.8s_ease_0.4s_both]">
            인공지능의 기초부터 실전 활용까지,<br />체계적으로 학습하세요.
          </p>

          <div className="flex flex-wrap justify-center gap-6 animate-[fadeInUp_0.8s_ease_0.6s_both]">
            {['📚 16개 모듈', '⏱ 12~20주', '👤 입문~중급'].map((m) => (
              <span key={m} className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{m}</span>
            ))}
          </div>
        </div>

        <button
          onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--color-text-muted)] animate-[bounce_2s_infinite]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}
        >
          시작하기 ↓
        </button>
      </section>

      {/* ─── Roadmap Overview ─── */}
      <section id="overview" className="mx-auto max-w-[1060px] px-5 py-16">
        <div className="mb-1 text-xs uppercase tracking-widest text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>Roadmap</div>
        <h2 className="mb-1 text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>학습 로드맵</h2>
        <p className="mb-8 text-sm text-[var(--color-text-dim)]">순서대로 따라가며 실습하세요. 진행률이 자동 저장됩니다.</p>

        <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roadmapData.map((stage) => {
            const prog = getStageProgress(stage.id, stage.topics.length);
            return (
              <Link key={stage.id} to="/roadmap"
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]">
                <div className="mb-2 text-3xl font-bold leading-none text-[var(--color-border-hover)] transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {stage.num}
                </div>
                <div className="mb-0.5 text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{stage.title}</div>
                <div className="mb-3 text-xs text-[var(--color-text-muted)]">{stage.description}</div>
                <div className="mb-2 text-[0.7rem] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>⏱ {stage.duration}</div>
                <div className="h-[3px] overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div className="h-full rounded-full bg-[var(--color-green)] transition-all duration-500" style={{ width: `${prog.pct}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
        <p className="text-center text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>완료: {total.done} / {total.total}</p>
      </section>

      {/* ─── Section Cards ─── */}
      <section className="mx-auto max-w-[1060px] px-5 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sectionCards.map((s) => (
            <Link key={s.to} to={s.to}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-hover)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}25` }}>
                <s.icon size={18} />
              </div>
              <h3 className="mb-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{s.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulseDot { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
      `}</style>
    </div>
  );
}
