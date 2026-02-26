const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

/* ── Types (matches backend PostResponse / AttachmentResponse) ── */

export interface AttachmentDto {
  id: number;
  originalName: string;
  contentType: string;
  fileSize: number;
}

export interface PostDto {
  id: number;
  postType: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  category: string | null;
  summary: string | null;
  createdAt: string;
  attachments: AttachmentDto[];
}

/* ── API functions ── */

export async function fetchPosts(type: 'COMMUNITY' | 'SHOWCASE'): Promise<PostDto[]> {
  const res = await fetch(`${BASE}/api/posts?type=${type}`);
  if (!res.ok) throw new Error(`게시글 조회 실패: ${res.status}`);
  return res.json();
}

export async function createPost(
  data: { postType: string; title: string; content: string; author: string; tags: string; category?: string; summary?: string },
  files?: File[],
): Promise<PostDto> {
  const form = new FormData();
  form.append('post', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  files?.forEach((f) => form.append('files', f));

  const res = await fetch(`${BASE}/api/posts`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`게시글 생성 실패: ${res.status}`);
  return res.json();
}

export async function updatePost(
  id: number,
  data: { title: string; content: string; author: string; tags: string; category?: string; summary?: string },
  files?: File[],
): Promise<PostDto> {
  const form = new FormData();
  form.append('post', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  files?.forEach((f) => form.append('files', f));

  const res = await fetch(`${BASE}/api/posts/${id}`, { method: 'PUT', body: form });
  if (!res.ok) throw new Error(`게시글 수정 실패: ${res.status}`);
  return res.json();
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE}/api/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`게시글 삭제 실패: ${res.status}`);
}

export async function deleteAttachment(attachmentId: number): Promise<void> {
  const res = await fetch(`${BASE}/api/posts/attachments/${attachmentId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`첨부파일 삭제 실패: ${res.status}`);
}

export function fileDownloadUrl(attachmentId: number): string {
  return `${BASE}/api/files/${attachmentId}`;
}


/* ── News API ── */

export interface NewsArticleDto {
  id: number;
  title: string;
  description: string;
  link: string;
  source: string;
  sourceType: string;
  imageUrl: string | null;
  publishedAt: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  last: boolean;
}

export async function fetchNews(type = 'all', page = 0, size = 30): Promise<PagedResponse<NewsArticleDto>> {
  const res = await fetch(`${BASE}/api/news?type=${type}&page=${page}&size=${size}`);
  if (!res.ok) throw new Error(`뉴스 조회 실패: ${res.status}`);
  return res.json();
}

export async function refreshNews(): Promise<{ newArticles: number }> {
  const res = await fetch(`${BASE}/api/news/refresh`, { method: 'POST' });
  if (!res.ok) throw new Error(`뉴스 새로고침 실패: ${res.status}`);
  return res.json();
}