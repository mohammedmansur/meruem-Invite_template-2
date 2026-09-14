import { useState, useEffect, useCallback } from 'react';
import weddingsData from '../data/weddings.json';

export function useWeddingRouter() {
  const parseCurrentId = useCallback(() => {
    if (typeof window === 'undefined') return weddingsData.defaultId;

    // 1. Check search params: ?id=... or ?wedding=...
    const searchParams = new URLSearchParams(window.location.search);
    const queryId = searchParams.get('id') || searchParams.get('wedding');
    if (queryId && weddingsData.weddings[queryId]) {
      return queryId;
    }

    // 2. Check hash: #id or #/wedding/id or #wedding/id
    const hash = window.location.hash.replace(/^#\/?(wedding\/)?/, '').trim();
    if (hash && weddingsData.weddings[hash]) {
      return hash;
    }

    // 3. Check path: /wedding/id or /id
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const lastPart = pathParts[pathParts.length - 1];
      if (weddingsData.weddings[lastPart]) {
        return lastPart;
      }
    }

    // Default to the designated default Kurdish Sorani invitation
    return weddingsData.defaultId;
  }, []);

  const [activeId, setActiveId] = useState(parseCurrentId);

  useEffect(() => {
    const handleUrlChange = () => {
      setActiveId(parseCurrentId());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [parseCurrentId]);

  const changeWedding = useCallback((newId) => {
    if (!weddingsData.weddings[newId]) return;

    const url = new URL(window.location.href);
    url.searchParams.set('id', newId);
    window.history.pushState({}, '', url.toString());
    setActiveId(newId);
  }, []);

  const wedding = weddingsData.weddings[activeId] || weddingsData.weddings[weddingsData.defaultId];

  const getShareUrl = useCallback((id = activeId) => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('id', id);
    return url.toString();
  }, [activeId]);

  return {
    activeId,
    wedding,
    allWeddings: Object.values(weddingsData.weddings),
    defaultId: weddingsData.defaultId,
    changeWedding,
    getShareUrl
  };
}
