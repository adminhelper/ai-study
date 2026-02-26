import { useState, useEffect, useCallback } from 'react';
import { fetchPosts, createPost, updatePost, deletePost, deleteAttachment, type PostDto } from '../api';

type PostType = 'COMMUNITY' | 'SHOWCASE';

export function usePosts(postType: PostType) {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts(postType);
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, [postType]);

  useEffect(() => { reload(); }, [reload]);

  const add = useCallback(async (
    data: { title: string; content: string; author: string; tags: string; category?: string; summary?: string },
    files?: File[],
  ) => {
    const created = await createPost({ ...data, postType }, files);
    setPosts((prev) => [created, ...prev]);
    return created;
  }, [postType]);

  const update = useCallback(async (
    id: number,
    data: { title: string; content: string; author: string; tags: string; category?: string; summary?: string },
    files?: File[],
  ) => {
    const updated = await updatePost(id, data, files);
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    return updated;
  }, []);

  const remove = useCallback(async (id: number) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const removeAttachment = useCallback(async (attachmentId: number, postId: number) => {
    await deleteAttachment(attachmentId);
    setPosts((prev) => prev.map((p) =>
      p.id === postId
        ? { ...p, attachments: p.attachments.filter((a) => a.id !== attachmentId) }
        : p,
    ));
  }, []);

  return { posts, loading, error, reload, add, update, remove, removeAttachment };
}
