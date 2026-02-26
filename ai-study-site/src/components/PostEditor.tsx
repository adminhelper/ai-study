import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X, Bold, Italic, Code, List, ListOrdered, Link, Heading2, Quote, Minus,
  Eye, Pencil, Upload, FileText, Image, Film, Trash2,
} from 'lucide-react';
import type { AttachmentDto } from '../api';
import { fileDownloadUrl } from '../api';
import MarkdownContent from './MarkdownContent';

/* ── Field definition ── */
export interface PostEditorField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

/* ── Save payload ── */
export interface PostEditorData {
  title: string;
  content: string;
  author: string;
  tags: string;
  category?: string;
  summary?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: PostEditorData, files: File[]) => void | Promise<void>;
  fields: PostEditorField[];
  initial?: Record<string, string>;
  /** 기존 첨부파일 (수정 시) */
  existingAttachments?: AttachmentDto[];
  onDeleteAttachment?: (id: number) => void | Promise<void>;
  title: string;
}

/* ── Markdown toolbar ── */
interface ToolbarAction { icon: React.ReactNode; label: string; prefix: string; suffix: string; block?: boolean }
const toolbarActions: ToolbarAction[] = [
  { icon: <Heading2 size={14} />, label: '제목', prefix: '## ', suffix: '', block: true },
  { icon: <Bold size={14} />, label: '굵게', prefix: '**', suffix: '**' },
  { icon: <Italic size={14} />, label: '기울임', prefix: '_', suffix: '_' },
  { icon: <Code size={14} />, label: '코드', prefix: '`', suffix: '`' },
  { icon: <Link size={14} />, label: '링크', prefix: '[', suffix: '](url)' },
  { icon: <Quote size={14} />, label: '인용', prefix: '> ', suffix: '', block: true },
  { icon: <List size={14} />, label: '목록', prefix: '- ', suffix: '', block: true },
  { icon: <ListOrdered size={14} />, label: '번호 목록', prefix: '1. ', suffix: '', block: true },
  { icon: <Minus size={14} />, label: '구분선', prefix: '\n---\n', suffix: '', block: true },
];

/* ── Helpers ── */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(ct: string) {
  if (ct.startsWith('image/')) return <Image size={14} className="text-[var(--color-accent2)]" />;
  if (ct.startsWith('video/')) return <Film size={14} className="text-[var(--color-accent3)]" />;
  return <FileText size={14} className="text-[var(--color-text-muted)]" />;
}

export default function PostEditor({
  open, onClose, onSave, fields, initial, existingAttachments, onDeleteAttachment, title,
}: Props) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const init: Record<string, string> = {};
      fields.forEach((f) => { init[f.key] = initial?.[f.key] ?? ''; });
      setForm(init);
      setEditorTab('write');
      setFiles([]);
      setDragOver(false);
      setSaving(false);
    }
  }, [open, initial, fields]);

  const set = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  /* ── Markdown insert ── */
  const insertMarkdown = useCallback((action: ToolbarAction) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = form.content ?? '';
    const selected = text.substring(start, end);
    const replacement = action.block && start > 0 && text[start - 1] !== '\n'
      ? `\n${action.prefix}${selected}${action.suffix}`
      : `${action.prefix}${selected}${action.suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    set('content', newText);
    requestAnimationFrame(() => {
      ta.focus();
      const cursor = start + replacement.length - action.suffix.length;
      ta.setSelectionRange(selected ? start + replacement.length : cursor, selected ? start + replacement.length : cursor);
    });
  }, [form.content]);

  /* ── File handling ── */
  const addFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    setFiles((prev) => [...prev, ...arr]);
  };
  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!(form.title ?? '').trim() || saving) return;
    setSaving(true);
    try {
      const data: PostEditorData = {
        title: form.title ?? '',
        content: form.content ?? '',
        author: form.author?.trim() || '익명',
        tags: form.tags ?? '',
        ...(form.category ? { category: form.category } : {}),
        ...(form.summary ? { summary: form.summary } : {}),
      };
      await onSave(data, files);
      onClose();
    } catch {
      // 에러는 호출측에서 처리
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  const metaFields = fields.filter((f) => f.type !== 'textarea');
  const contentField = fields.find((f) => f.type === 'textarea');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 flex w-full max-w-[720px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-2xl"
        style={{ background: 'var(--color-bg-deep)', maxHeight: 'min(92vh, 900px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'var(--color-accent-glow)' }}>
              <Pencil size={14} className="text-[var(--color-accent)]" />
            </div>
            <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text)]">
            <X size={16} />
          </button>
        </div>

        {/* ─── Body ─── */}
        <div className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth: 'thin' }}>
          {/* Meta fields */}
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            {metaFields.map((f) => (
              <div key={f.key} className={f.key === 'tags' ? 'sm:col-span-2' : ''}>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {f.label} {f.required && <span className="text-[var(--color-accent)]">*</span>}
                </label>
                {f.type === 'select' ? (
                  <select value={form[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent-glow)]">
                    <option value="">선택하세요</option>
                    {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input type="text" value={form[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent-glow)]" />
                )}
              </div>
            ))}
          </div>

          {/* ─── Content editor ─── */}
          {contentField && (
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {contentField.label}
                </label>
                <div className="flex overflow-hidden rounded-lg border border-[var(--color-border)]" style={{ fontSize: 0 }}>
                  {([['write', '작성', <Pencil key="w" size={12} />], ['preview', '미리보기', <Eye key="p" size={12} />]] as const).map(([key, label, icon]) => (
                    <button key={key} onClick={() => setEditorTab(key)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium transition-all"
                      style={{ fontFamily: 'var(--font-mono)', background: editorTab === key ? 'var(--color-accent-glow)' : 'transparent', color: editorTab === key ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                      {icon} {label}
                    </button>
                  ))}
                </div>
              </div>

              {editorTab === 'write' && (
                <div className="mb-2 flex flex-wrap gap-0.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-1.5">
                  {toolbarActions.map((action, i) => (
                    <button key={i} onClick={() => insertMarkdown(action)} title={action.label}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-all hover:bg-[var(--color-accent-glow)] hover:text-[var(--color-accent)]">
                      {action.icon}
                    </button>
                  ))}
                  <span className="ml-auto self-center pr-2 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>Markdown 지원</span>
                </div>
              )}

              {editorTab === 'write' ? (
                <textarea ref={textareaRef} value={form.content ?? ''} onChange={(e) => set('content', e.target.value)}
                  placeholder={contentField.placeholder ?? '마크다운으로 작성하세요...\n\n## 제목\n**굵은 텍스트**, _기울임_, `코드`\n- 목록 항목'}
                  rows={10}
                  className="w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-sm leading-relaxed text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-muted)]/40 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent-glow)]"
                  style={{ fontFamily: 'var(--font-mono)', minHeight: '180px' }} />
              ) : (
                <div className="min-h-[180px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3">
                  {(form.content ?? '').trim()
                    ? <MarkdownContent>{form.content}</MarkdownContent>
                    : <p className="py-10 text-center text-sm text-[var(--color-text-muted)]">미리보기할 내용이 없습니다.</p>}
                </div>
              )}
            </div>
          )}

          {/* ─── File upload ─── */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
              첨부파일
            </label>

            {/* Drop zone */}
            <div
              className="mb-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 transition-all"
              style={{
                borderColor: dragOver ? 'var(--color-accent)' : 'var(--color-border)',
                background: dragOver ? 'var(--color-accent-glow)' : 'transparent',
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={20} className="mb-2 text-[var(--color-text-muted)]" />
              <p className="text-xs text-[var(--color-text-muted)]">파일을 드래그하거나 <span className="text-[var(--color-accent)]">클릭</span>하여 업로드</p>
              <p className="mt-1 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>최대 50MB / 파일</p>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ''; }} />
            </div>

            {/* Existing attachments (edit mode) */}
            {existingAttachments && existingAttachments.length > 0 && (
              <div className="mb-2 space-y-1.5">
                <p className="text-[10px] font-medium text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>기존 파일</p>
                {existingAttachments.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2">
                    {fileIcon(a.contentType)}
                    <a href={fileDownloadUrl(a.id)} target="_blank" rel="noopener noreferrer"
                      className="flex-1 truncate text-xs text-[var(--color-text-dim)] hover:text-[var(--color-accent2)]">
                      {a.originalName}
                    </a>
                    <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{formatFileSize(a.fileSize)}</span>
                    {onDeleteAttachment && (
                      <button onClick={() => onDeleteAttachment(a.id)} title="삭제"
                        className="flex h-5 w-5 items-center justify-center rounded text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-red)]">
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* New files to upload */}
            {files.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-medium text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>새 파일 ({files.length})</p>
                {files.map((f, i) => (
                  <div key={`${f.name}-${i}`} className="flex items-center gap-2 rounded-lg border border-[var(--color-accent)]30 bg-[var(--color-accent-glow)] px-3 py-2">
                    {fileIcon(f.type)}
                    <span className="flex-1 truncate text-xs text-[var(--color-text-dim)]">{f.name}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{formatFileSize(f.size)}</span>
                    <button onClick={() => removeFile(i)} title="제거"
                      className="flex h-5 w-5 items-center justify-center rounded text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-red)]">
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── Footer ─── */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-6 py-4">
          <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
            마크다운 + 파일첨부 지원
          </span>
          <div className="flex gap-2">
            <button onClick={onClose}
              className="rounded-xl border border-[var(--color-border)] px-5 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              취소
            </button>
            <button onClick={handleSave} disabled={saving}
              className="rounded-xl bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50">
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
