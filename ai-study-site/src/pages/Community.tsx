import { useState, useMemo } from 'react';
import { ExternalLink, Plus, Pencil, Trash2, ChevronDown, FileText, Loader2 } from 'lucide-react';
import { communityData, communityTypeLabels, type CommunityType } from '../data/community';
import { usePosts } from '../hooks/usePosts';
import { fileDownloadUrl, type PostDto } from '../api';
import PostEditor, { type PostEditorField, type PostEditorData } from '../components/PostEditor';
import MarkdownContent from '../components/MarkdownContent';

const types = Object.entries(communityTypeLabels) as [CommunityType, string][];
const tc: Record<CommunityType, { color: string; bg: string }> = {
  forum: { color: 'var(--color-accent)', bg: 'var(--color-accent-glow)' },
  discord: { color: 'var(--color-accent3)', bg: 'rgba(167,139,250,0.10)' },
  newsletter: { color: 'var(--color-accent2)', bg: 'var(--color-accent2-glow)' },
  youtube: { color: 'var(--color-red)', bg: 'rgba(248,113,113,0.10)' },
  podcast: { color: 'var(--color-yellow)', bg: 'rgba(251,191,36,0.10)' },
  blog: { color: 'var(--color-green)', bg: 'var(--color-green-dim)' },
};

const communityFields: PostEditorField[] = [
  { key: 'title', label: '제목', type: 'text', placeholder: '글 제목을 입력하세요', required: true },
  { key: 'content', label: '내용', type: 'textarea', placeholder: '자유롭게 작성하세요 (마크다운 지원)' },
  { key: 'author', label: '작성자', type: 'text', placeholder: '닉네임 (미입력 시 익명)' },
  { key: 'tags', label: '태그', type: 'text', placeholder: '쉼표로 구분 (예: Claude, 팁, 질문)' },
];

export default function Community() {
  const [tab, setTab] = useState<'list' | 'board'>('list');
  const [active, setActive] = useState<CommunityType | 'all'>('all');
  const filtered = useMemo(() => active === 'all' ? communityData : communityData.filter((c) => c.type === active), [active]);

  // API-backed user posts
  const { posts, loading, add, update, remove, removeAttachment } = usePosts('COMMUNITY');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<PostDto | undefined>();
  const [openPosts, setOpenPosts] = useState<Set<number>>(new Set());
  const flip = (id: number) => setOpenPosts((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleSave = async (data: PostEditorData, files: File[]) => {
    if (editing) {
      await update(editing.id, data, files);
      setEditing(undefined);
    } else {
      await add(data, files);
    }
  };
  const startEdit = (post: PostDto) => { setEditing(post); setEditorOpen(true); };
  const handleDelete = async (id: number) => { if (confirm('정말 삭제하시겠습니까?')) await remove(id); };

  const editorInitial = editing
    ? { title: editing.title, content: editing.content, author: editing.author, tags: editing.tags.join(', ') }
    : undefined;

  return (
    <div className="mx-auto max-w-[1060px] px-5 py-16">
      <div className="mb-1 text-xs uppercase tracking-widest text-[var(--color-accent3)]" style={{ fontFamily: 'var(--font-mono)' }}>Community</div>
      <h1 className="mb-1 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>AI 커뮤니티</h1>
      <p className="mb-6 text-sm text-[var(--color-text-dim)]">AI를 함께 학습하고 토론할 수 있는 공간입니다.</p>

      {/* Tabs */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-1" style={{ width: 'fit-content' }}>
          {([['list', '커뮤니티 모음'], ['board', '자유 게시판']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="rounded-md px-4 py-2 text-sm font-medium transition-all"
              style={{ fontFamily: 'var(--font-display)', background: tab === key ? 'var(--color-accent3)' : 'transparent', color: tab === key ? 'white' : 'var(--color-text-muted)' }}>
              {label}
            </button>
          ))}
        </div>
        {tab === 'board' && (
          <button onClick={() => { setEditing(undefined); setEditorOpen(true); }}
            className="ml-auto flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            <Plus size={15} /> 글쓰기
          </button>
        )}
      </div>

      {/* ─── 커뮤니티 모음 탭 ─── */}
      {tab === 'list' && (
        <>
          <div className="mb-8 flex flex-wrap gap-2">
            <button onClick={() => setActive('all')}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ fontFamily: 'var(--font-mono)', background: active === 'all' ? 'var(--color-accent-glow)' : 'transparent', color: active === 'all' ? 'var(--color-accent)' : 'var(--color-text-muted)', border: `1px solid ${active === 'all' ? 'rgba(249,115,22,0.25)' : 'var(--color-border)'}` }}>
              전체
            </button>
            {types.map(([k, label]) => {
              const c = tc[k]; const on = active === k;
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
            {filtered.map((item) => {
              const c = tc[item.type];
              return (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold">{item.name}</h3>
                    <ExternalLink size={14} className="mt-1 shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text)]" />
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-dim)]">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-medium" style={{ background: c.bg, color: c.color, fontFamily: 'var(--font-mono)' }}>{communityTypeLabels[item.type]}</span>
                    <span className="rounded-md border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.language === 'ko' ? '🇰🇷 한국어' : item.language === 'en' ? '🇺🇸 English' : '🌐 다국어'}
                    </span>
                    {item.tags.map((tag) => <span key={tag} className="text-[10px] text-[var(--color-text-muted)]">#{tag}</span>)}
                  </div>
                </a>
              );
            })}
          </div>
        </>
      )}

      {/* ─── 자유 게시판 탭 ─── */}
      {tab === 'board' && (
        <>
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={20} className="animate-spin text-[var(--color-text-muted)]" />
            </div>
          )}
          {!loading && posts.length === 0 && (
            <div className="py-20 text-center">
              <p className="mb-2 text-sm text-[var(--color-text-muted)]">아직 게시글이 없습니다.</p>
              <p className="text-xs text-[var(--color-text-muted)]">첫 번째 글을 작성해보세요!</p>
            </div>
          )}
          <div className="space-y-3">
            {posts.map((post) => {
              const open = openPosts.has(post.id);
              return (
                <div key={post.id} className="overflow-hidden rounded-xl border transition-all" style={{
                  borderColor: open ? 'var(--color-border-hover)' : 'var(--color-border)',
                  background: 'var(--color-bg-card)',
                }}>
                  <div className="flex items-center">
                    <button onClick={() => flip(post.id)} className="flex flex-1 items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[rgba(255,255,255,0.015)]">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{post.title}</div>
                          {post.attachments.length > 0 && (
                            <FileText size={12} className="text-[var(--color-accent2)]" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                          <span>{post.author}</span>
                          <span style={{ fontFamily: 'var(--font-mono)' }}>{post.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300" style={{
                        transform: open ? 'rotate(180deg)' : 'rotate(0)',
                        borderColor: open ? 'var(--color-accent3)' : 'var(--color-border)',
                        color: open ? 'var(--color-accent3)' : 'var(--color-text-muted)',
                      }}>
                        <ChevronDown size={13} />
                      </div>
                    </button>
                    <div className="flex gap-1 pr-4">
                      <button onClick={() => startEdit(post)} title="수정"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-accent-glow)] hover:text-[var(--color-accent)]">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} title="삭제"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(248,113,113,0.1)] hover:text-[var(--color-red)]">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {open && (
                    <div className="border-t border-[var(--color-border)] px-5 py-4">
                      <div className="mb-3"><MarkdownContent>{post.content}</MarkdownContent></div>

                      {/* Attachments */}
                      {post.attachments.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.attachments.map((a) => (
                            <a key={a.id} href={fileDownloadUrl(a.id)} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-2.5 py-1 text-[11px] text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-accent2)] hover:text-[var(--color-accent2)]"
                              style={{ fontFamily: 'var(--font-mono)' }}>
                              <FileText size={11} /> {a.originalName}
                            </a>
                          ))}
                        </div>
                      )}

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-[0.68rem] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <PostEditor
        open={editorOpen}
        onClose={() => { setEditorOpen(false); setEditing(undefined); }}
        onSave={handleSave}
        fields={communityFields}
        initial={editorInitial}
        existingAttachments={editing?.attachments}
        onDeleteAttachment={editing ? (aid) => removeAttachment(aid, editing.id) : undefined}
        title={editing ? '글 수정' : '새 글 작성'}
      />
    </div>
  );
}
