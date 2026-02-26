import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, RefreshCw, Loader2, Clock, Newspaper, BookOpen } from 'lucide-react';
import { newsData, newsTypeLabels, type NewsType } from '../data/news';
import { fetchNews, refreshNews, type NewsArticleDto } from '../api';

/* ── Type colors (shared) ── */
const tc: Record<string, { color: string; bg: string; label: string }> = {
  official: { color: 'var(--color-accent)', bg: 'var(--color-accent-glow)', label: '공식' },
  media:    { color: 'var(--color-accent2)', bg: 'var(--color-accent2-glow)', label: '미디어' },
  aggregator: { color: 'var(--color-yellow)', bg: 'rgba(251,191,36,0.10)', label: '모음' },
  research: { color: 'var(--color-accent3)', bg: 'rgba(167,139,250,0.10)', label: '연구' },
};

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
  return d.toLocaleDateString('ko-KR');
}

export default function News() {
  const [tab, setTab] = useState<'feed' | 'sources'>('feed');

  /* ─ Feed state ─ */
  const [articles, setArticles] = useState<NewsArticleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedFilter, setFeedFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadArticles = useCallback(async (p: number, type: string, append = false) => {
    try {
      setLoading(true);
      const data = await fetchNews(type, p, 30);
      setArticles((prev) => append ? [...prev, ...data.content] : data.content);
      setHasMore(!data.last);
      setTotal(data.totalElements);
      setPage(data.number);
    } catch {
      // API 연결 실패 시 빈 상태 유지
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadArticles(0, feedFilter); }, [feedFilter, loadArticles]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshNews();
      await loadArticles(0, feedFilter);
    } catch { /* skip */ }
    setRefreshing(false);
  };

  const loadMore = () => { if (hasMore && !loading) loadArticles(page + 1, feedFilter, true); };

  /* ─ Sources state ─ */
  const [srcFilter, setSrcFilter] = useState<NewsType | 'all'>('all');
  const filteredSources = srcFilter === 'all' ? newsData : newsData.filter((n) => n.type === srcFilter);
  const types = Object.entries(newsTypeLabels) as [NewsType, string][];

  return (
    <div className="mx-auto max-w-[1060px] px-5 py-16">
      <div className="mb-1 text-xs uppercase tracking-widest text-[var(--color-yellow)]" style={{ fontFamily: 'var(--font-mono)' }}>News</div>
      <h1 className="mb-1 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>AI 뉴스</h1>
      <p className="mb-6 text-sm text-[var(--color-text-dim)]">AI 최신 소식을 놓치지 마세요. RSS 피드에서 자동으로 수집됩니다.</p>

      {/* Tabs */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-1" style={{ width: 'fit-content' }}>
          {([['feed', '실시간 피드', <Newspaper key="f" size={13} />], ['sources', '뉴스 소스', <BookOpen key="s" size={13} />]] as const).map(([key, label, icon]) => (
            <button key={key} onClick={() => setTab(key)}
              className="flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-all"
              style={{ fontFamily: 'var(--font-display)', background: tab === key ? 'var(--color-yellow)' : 'transparent', color: tab === key ? '#0a0f18' : 'var(--color-text-muted)' }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {tab === 'feed' && (
          <button onClick={handleRefresh} disabled={refreshing}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium text-[var(--color-text-muted)] transition-all hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]">
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? '수집 중...' : '새로고침'}
          </button>
        )}
      </div>

      {/* ═══ 실시간 피드 탭 ═══ */}
      {tab === 'feed' && (
        <>
          {/* Type filter pills */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {[{ key: 'all', label: '전체' }, ...Object.entries(tc).map(([k, v]) => ({ key: k, label: v.label }))].map(({ key, label }) => {
              const c = tc[key] ?? { color: 'var(--color-accent)', bg: 'var(--color-accent-glow)' };
              const on = feedFilter === key;
              return (
                <button key={key} onClick={() => { setFeedFilter(key); setPage(0); }}
                  className="rounded-full border px-3 py-1 text-[11px] font-medium transition-all"
                  style={{ fontFamily: 'var(--font-mono)', borderColor: on ? c.color : 'var(--color-border)', background: on ? c.bg : 'transparent', color: on ? c.color : 'var(--color-text-muted)' }}>
                  {label}
                </button>
              );
            })}
            {total > 0 && (
              <span className="ml-auto text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{total}개 기사</span>
            )}
          </div>

          {/* Articles */}
          {!loading && articles.length === 0 && (
            <div className="py-20 text-center">
              <p className="mb-2 text-sm text-[var(--color-text-muted)]">아직 수집된 뉴스가 없습니다.</p>
              <button onClick={handleRefresh}
                className="mt-2 rounded-lg bg-[var(--color-yellow)] px-4 py-2 text-sm font-medium text-[#0a0f18] transition-opacity hover:opacity-90">
                지금 수집하기
              </button>
            </div>
          )}

          <div className="space-y-3">
            {articles.map((a) => {
              const c = tc[a.sourceType] ?? tc.media;
              return (
                <a key={a.id} href={a.link} target="_blank" rel="noopener noreferrer"
                  className="group flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]">

                  {/* Thumbnail or source badge */}
                  {a.imageUrl ? (
                    <div className="hidden h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg sm:block">
                      <img src={a.imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  ) : (
                    <div className="hidden h-20 w-28 flex-shrink-0 items-center justify-center rounded-lg sm:flex" style={{ background: c.bg, border: `1px solid ${c.color}25` }}>
                      <Newspaper size={20} style={{ color: c.color }} />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-start gap-2">
                      <h3 className="flex-1 text-sm font-semibold leading-snug transition-colors group-hover:text-[var(--color-accent2)]" style={{ fontFamily: 'var(--font-display)' }}>
                        {a.title}
                      </h3>
                      <ExternalLink size={12} className="mt-0.5 flex-shrink-0 text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    {a.description && (
                      <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-dim)]">
                        {a.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="rounded-md px-1.5 py-0.5 font-medium" style={{ background: c.bg, color: c.color, fontFamily: 'var(--font-mono)' }}>
                        {a.source}
                      </span>
                      <span className="flex items-center gap-1 text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                        <Clock size={9} /> {timeAgo(a.publishedAt)}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Load more / Loading */}
          {loading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 size={20} className="animate-spin text-[var(--color-text-muted)]" />
            </div>
          )}
          {hasMore && !loading && articles.length > 0 && (
            <div className="mt-6 text-center">
              <button onClick={loadMore}
                className="rounded-lg border border-[var(--color-border)] px-6 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]">
                더 보기
              </button>
            </div>
          )}
        </>
      )}

      {/* ═══ 뉴스 소스 탭 ═══ */}
      {tab === 'sources' && (
        <>
          <div className="mb-8 flex flex-wrap gap-2">
            <button onClick={() => setSrcFilter('all')}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ fontFamily: 'var(--font-mono)', background: srcFilter === 'all' ? 'var(--color-accent-glow)' : 'transparent', color: srcFilter === 'all' ? 'var(--color-accent)' : 'var(--color-text-muted)', border: `1px solid ${srcFilter === 'all' ? 'rgba(249,115,22,0.25)' : 'var(--color-border)'}` }}>
              전체
            </button>
            {types.map(([k, label]) => {
              const c = tc[k]; const on = srcFilter === k;
              return (
                <button key={k} onClick={() => setSrcFilter(k)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{ fontFamily: 'var(--font-mono)', background: on ? c.bg : 'transparent', color: on ? c.color : 'var(--color-text-muted)', border: `1px solid ${on ? c.color + '40' : 'var(--color-border)'}` }}>
                  {label}
                </button>
              );
            })}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSources.map((s) => {
              const c = tc[s.type];
              return (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold">{s.name}</h3>
                    <ExternalLink size={14} className="mt-1 shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text)]" />
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-dim)]">{s.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-medium" style={{ background: c.bg, color: c.color, fontFamily: 'var(--font-mono)' }}>{newsTypeLabels[s.type]}</span>
                    <span className="rounded-md border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {s.language === 'ko' ? '🇰🇷 한국어' : s.language === 'en' ? '🇺🇸 English' : '🌐 다국어'}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>📅 {s.updateFrequency}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
