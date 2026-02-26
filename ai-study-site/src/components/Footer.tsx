export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[1060px] px-5 py-8 text-center">
        <p className="mb-1 text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          AI <span className="text-[var(--color-accent)]">A-Z</span>
        </p>
        <p className="mb-3 text-xs text-[var(--color-text-muted)]">AI 시대의 학습 가이드 · 2026</p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: 'Claude Code', url: 'https://docs.anthropic.com/en/docs/claude-code' },
            { label: 'OpenAI', url: 'https://openai.com' },
            { label: 'Anthropic', url: 'https://www.anthropic.com' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
