import { useState, useEffect, useCallback } from 'react';

export interface LocalPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
  /** Showcase-specific */
  category?: string;
  summary?: string;
}

export function useLocalPosts(storageKey: string) {
  const [posts, setPosts] = useState<LocalPost[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(posts));
  }, [posts, storageKey]);

  const add = useCallback((post: Omit<LocalPost, 'id' | 'createdAt'>) => {
    const newPost: LocalPost = {
      ...post,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const update = useCallback((id: string, data: Partial<Omit<LocalPost, 'id' | 'createdAt'>>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const remove = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { posts, add, update, remove };
}
