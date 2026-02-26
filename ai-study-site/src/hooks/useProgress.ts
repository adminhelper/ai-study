import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'ai-az-progress';

function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveProgress(completed: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
}

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(loadProgress);

  useEffect(() => {
    saveProgress(completed);
  }, [completed]);

  const toggle = useCallback((key: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (key: string) => completed.has(key),
    [completed],
  );

  const getStageProgress = useCallback(
    (stageId: string, topicCount: number) => {
      let done = 0;
      for (let i = 0; i < topicCount; i++) {
        if (completed.has(`${stageId}-${i}`)) done++;
      }
      return { done, total: topicCount, pct: topicCount === 0 ? 0 : Math.round((done / topicCount) * 100) };
    },
    [completed],
  );

  const totalProgress = useCallback(
    (stages: { id: string; topics: unknown[] }[]) => {
      let done = 0;
      let total = 0;
      for (const s of stages) {
        for (let i = 0; i < s.topics.length; i++) {
          total++;
          if (completed.has(`${s.id}-${i}`)) done++;
        }
      }
      return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
    },
    [completed],
  );

  return { toggle, isCompleted, getStageProgress, totalProgress };
}
