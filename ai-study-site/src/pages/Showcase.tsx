import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, FileText, Loader2, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { showcaseData, showcaseCategories, type ShowcaseCategory } from '../data/showcase';
import { usePosts } from '../hooks/usePosts';
import { fileDownloadUrl, type PostDto, type AttachmentDto } from '../api';
import PostEditor, { type PostEditorField, type PostEditorData } from '../components/PostEditor';
import MarkdownContent from '../components/MarkdownContent';

const showcaseFields: PostEditorField[] = [
  { key: 'title', label: '제목', type: 'text', placeholder: '노하우 제목을 입력하세요', required: true },
  { key: 'category', label: '카테고리', type: 'select', required: true, options: showcaseCategories.map((c) => ({ value: c.key, label: `${c.emoji} ${c.key}` })) },
  { key: 'summary', label: '한줄 요약', type: 'text', placeholder: '한줄 요약 (카드에 표시됩니다)' },
  { key: 'content', label: '내용', type: 'textarea', placeholder: '마크다운으로 자유롭게 작성하세요' },
  { key: 'author', label: '작성자', type: 'text', placeholder: '닉네임 (미입력 시 익명)' },
  { key: 'tags', label: '태그', type: 'text', placeholder: '쉼표로 구분 (예: Claude, 팁, 자동화)' },
];

/* ── Helpers ── */
function authorInitial(name: string): string {
  return (name || '익')[0].toUpperCase();
}

function authorColor(name: string): string {
  const colors = ['var(--color-accent)', 'var(--color-accent2)', 'var(--color-accent3)', 'var(--color-green)', '#f472b6', 'var(--color-yellow)'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function isImageAttachment(a: AttachmentDto): boolean {
  return a.contentType.startsWith('image/');
}

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

export default function Showcase() {
  const [filter, setFilter] = useState<ShowcaseCategory | '전체'>('전체');
  const [expandedPosts, setExpandedPosts] = useState<Set<string | number>>(new Set());

  const { posts: userPosts, loading, add, update, remove, removeAttachment } = usePosts('SHOWCASE');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<PostDto | undefined>();

  const toggleExpand = (id: string | number) => setExpandedPosts((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  type MergedPost = { id: string | number; category: string | null; title: string; summary: string | null; author: string; createdAt: string; content: string; tags: string[]; isUser: boolean; attachments: AttachmentDto[] };

  const allPosts = useMemo(() => {
    const user: MergedPost[] = userPosts.map((p) => ({ ...p, isUser: true }));
    const sample: MergedPost[] = showcaseData.map((p) => ({ ...p, isUser: false, attachments: [] }));
    return [...user, ...sample];
  }, [userPosts]);

  const filtered = useMemo(
    () => filter === '전체' ? allPosts : allPosts.filter((p) => p.category === filter),
    [filter, allPosts],
  );

  const totalCount = allPosts.length;
  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    showcaseCategories.forEach((c) => { map[c.key] = 0; });
    allPosts.forEach((p) => { if (p.category && map[p.category] !== undefined) map[p.category]++; });
    return map;
  }, [allPosts]);

  const handleSave = async (data: PostEditorData, files: File[]) => {
    if (editing) { await update(editing.id, data, files); setEditing(undefined); }
    else await add(data, files);
  };
  const startEdit = (id: number) => { const found = userPosts.find((p) => p.id === id); if (found) { setEditing(found); setEditorOpen(true); } };
  const handleDelete = async (id: number) => { if (confirm('정말 삭제하시겠습니까?')) await remove(id); };

  const editorInitial = editing
    ? { title: editing.title, content: editing.content, author: editing.author, tags: editing.tags.join(', '), category: editing.category ?? '', summary: editing.summary ?? '' }
    : undefined;

  return (
    <div className="mx-auto max-w-[800px] px-5 py-16">
      {/* Header */}
      <div className="mb-1 text-xs uppercase tracking-widest text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>Showcase</div>
      <h1 className="mb-1 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>AI 노하우 공유</h1>
      <p className="mb-8 text-sm text-[var(--color-text-dim)]">실전에서 검증된 AI 활용 팁, 프롬프트, 자동화 레시피를 공유합니다.</p>

      {/* Category Filter + Write */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <button onClick={() => setFilter('전체')}
          className="rounded-full border px-3 py-1 text-[11px] font-medium transition-all"
          style={{ fontFamily: 'var(--font-mono)', borderColor: filter === '전체' ? 'var(--color-accent)' : 'var(--color-border)', background: filter === '전체' ? 'var(--color-accent-glow)' : 'transparent', color: filter === '전체' ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
          전체 ({totalCount})
        </button>
        {showcaseCategories.map((cat) => (
          <button key={cat.key} onClick={() => setFilter(cat.key)}
            className="rounded-full border px-3 py-1 text-[11px] font-medium transition-all"
            style={{ fontFamily: 'var(--font-mono)', borderColor: filter === cat.key ? cat.color : 'var(--color-border)', background: filter === cat.key ? `${cat.color}15` : 'transparent', color: filter === cat.key ? cat.color : 'var(--color-text-muted)' }}>
            {cat.emoji} {cat.key} ({catCounts[cat.key] ?? 0})
          </button>
        ))}
        <button onClick={() => { setEditing(undefined); setEditorOpen(true); }}
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
          <Plus size={15} /> 글쓰기
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 size={20} className="animate-spin text-[var(--color-text-muted)]" />
        </div>
      )}

      {/* ═══ LinkedIn-style Feed Cards ═══ */}
      <div className="space-y-4">
        {filtered.map((post) => {
          const cat = showcaseCategories.find((c) => c.key === post.category);
          const expanded = expandedPosts.has(post.id);
          const ac = authorColor(post.author);
          const images = post.attachments.filter(isImageAttachment);
          const files = post.attachments.filter((a) => !isImageAttachment(a));
          const contentPreview = post.content.length > 200 ? post.content.slice(0, 200) + '...' : post.content;
          const needsExpand = post.content.length > 200;

          return (
            <article key={`${post.isUser ? 'u' : 's'}-${post.id}`}
              className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all hover:border-[var(--color-border-hover)]">

              {/* ─ Author header ─ */}
              <div className="flex items-center gap-3 px-5 pt-4 pb-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: ac }}>
                  {authorInitial(post.author)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{post.author}</div>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span>{timeAgo(post.createdAt)}</span>
                    {cat && (
                      <span className="rounded-md px-1.5 py-0.5" style={{ background: `${cat.color}15`, color: cat.color }}>
                        {cat.emoji} {cat.key}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions (user posts only) */}
                {post.isUser && (
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(post.id as number)} title="수정"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-accent-glow)] hover:text-[var(--color-accent)]">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(post.id as number)} title="삭제"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(248,113,113,0.1)] hover:text-[var(--color-red)]">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>

              {/* ─ Title + Summary ─ */}
              <div className="px-5 pb-2">
                <h3 className="mb-1 text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>{post.title}</h3>
                {post.summary && <p className="text-xs text-[var(--color-text-dim)]">{post.summary}</p>}
              </div>

              {/* ─ Content (MD preview / expanded) ─ */}
              <div className="px-5 pb-3">
                {expanded ? (
                  <div className="mb-2"><MarkdownContent>{post.content}</MarkdownContent></div>
                ) : (
                  <div className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                    <MarkdownContent>{contentPreview}</MarkdownContent>
                  </div>
                )}
                {needsExpand && (
                  <button onClick={() => toggleExpand(post.id)}
                    className="mt-1 flex items-center gap-1 text-xs font-medium text-[var(--color-accent2)] transition-colors hover:text-[var(--color-accent)]">
                    {expanded ? <><ChevronUp size={12} /> 접기</> : <><ChevronDown size={12} /> 더 보기</>}
                  </button>
                )}
              </div>

              {/* ─ Image attachments (gallery) ─ */}
              {images.length > 0 && (
                <div className={`grid gap-1 ${images.length === 1 ? '' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {images.slice(0, 3).map((img) => (
                    <a key={img.id} href={fileDownloadUrl(img.id)} target="_blank" rel="noopener noreferrer"
                      className="relative block overflow-hidden bg-[var(--color-bg-deep)]" style={{ aspectRatio: images.length === 1 ? '16/9' : '1' }}>
                      <img src={fileDownloadUrl(img.id)} alt={img.originalName}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                      {images.length > 3 && img === images[2] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-bold text-white">
                          +{images.length - 3}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}

              {/* ─ File attachments ─ */}
              {files.length > 0 && (
                <div className="mx-5 mt-2 mb-1 space-y-1">
                  {files.map((f) => (
                    <a key={f.id} href={fileDownloadUrl(f.id)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 transition-colors hover:border-[var(--color-accent2)]">
                      <FileText size={14} className="text-[var(--color-accent2)]" />
                      <span className="flex-1 truncate text-xs text-[var(--color-text-dim)]">{f.originalName}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                        {(f.fileSize / 1024).toFixed(0)} KB
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* ─ Tags footer ─ */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 border-t border-[var(--color-border)] px-5 py-3">
                  <Tag size={11} className="text-[var(--color-text-muted)]" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-[var(--color-accent2)]" style={{ fontFamily: 'var(--font-mono)' }}>#{tag}</span>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && !loading && (
        <p className="py-20 text-center text-sm text-[var(--color-text-muted)]">해당 카테고리에 글이 없습니다.</p>
      )}

      <PostEditor
        open={editorOpen}
        onClose={() => { setEditorOpen(false); setEditing(undefined); }}
        onSave={handleSave}
        fields={showcaseFields}
        initial={editorInitial}
        existingAttachments={editing?.attachments}
        onDeleteAttachment={editing ? (aid) => removeAttachment(aid, editing.id) : undefined}
        title={editing ? '노하우 수정' : '새 노하우 작성'}
      />
    </div>
  );
}
