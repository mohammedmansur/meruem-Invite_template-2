import React, { useRef, useEffect } from 'react';
import { useWeddingRouter } from './utils/useWeddingRouter';
import DemoBar from './components/DemoBar';
import './App.css';

function App() {
  const {
    activeId,
    wedding,
    allWeddings,
    defaultId,
    changeWedding,
    getShareUrl
  } = useWeddingRouter();

  const iframeRef = useRef(null);

  // Sync document title, lang, and dir with the active wedding
  useEffect(() => {
    if (wedding) {
      document.documentElement.lang = wedding.language;
      document.documentElement.dir = wedding.direction;
      const groom = wedding.couple?.groom || '';
      const bride = wedding.couple?.bride || '';
      const subtitle = wedding.couple?.subtitle || 'Dolce Vita';
      document.title = `${groom} & ${bride} | ${subtitle}`;
    }
  }, [wedding]);

  const handleSelectWedding = (newId) => {
    changeWedding(newId);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'CHANGE_WEDDING', id: newId },
        '*'
      );
    }
  };

  const iframeSrc = `/invitation/index.html?id=${encodeURIComponent(activeId)}`;

  const isDevOrLocal =
    Boolean(import.meta.env.DEV) ||
    (typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.endsWith('.local')));

  return (
    <div className="invitation-app-root">
      {/* Top Demo Selector & Share Link - Dev & Local Only */}
      {isDevOrLocal && (
        <DemoBar
          activeId={activeId}
          allWeddings={allWeddings}
          defaultId={defaultId}
          onSelectWedding={handleSelectWedding}
          getShareUrl={getShareUrl}
          currentLanguage={wedding?.language || 'ckb'}
        />
      )}

      {/* Embedded Dolce Vita Invitation with Dynamic Live Sync */}
      <main className="invitation-frame-container">
        <iframe
          ref={iframeRef}
          className="invitation-frame"
          src={iframeSrc}
          title={`${wedding?.couple?.groom || ''} & ${wedding?.couple?.bride || ''} Wedding Invitation`}
          allow="autoplay; fullscreen"
        />
      </main>
    </div>
  );
}

export default App;
