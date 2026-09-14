import React, { useState } from 'react';
import { getT } from '../utils/i18n';

export default function DemoBar({
  activeId,
  allWeddings,
  defaultId,
  onSelectWedding,
  getShareUrl,
  currentLanguage = 'ckb'
}) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const t = getT(currentLanguage);

  const handleCopy = async () => {
    const shareUrl = getShareUrl(activeId);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const getLanguageLabel = (lang) => {
    switch (lang) {
      case 'ckb':
        return 'کوردی سۆرانی (RTL)';
      case 'ar':
        return 'العربية (RTL)';
      case 'en':
        return 'English (LTR)';
      default:
        return lang.toUpperCase();
    }
  };

  return (
    <aside className={`demo-bar ${collapsed ? 'collapsed' : ''}`} aria-label="Demo Bar">
      <div className="demo-bar-inner">
        <button
          type="button"
          className="demo-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Show Wedding Switcher' : 'Hide Bar'}
          aria-label={collapsed ? 'Show Wedding Switcher' : 'Hide Bar'}
        >
          {collapsed ? '▾ Switch Wedding' : '▴ Hide'}
        </button>

        {!collapsed && (
          <div className="demo-bar-content">
            <div className="demo-selector-group">
              <span className="demo-label">{t.demoLabel}</span>
              <div className="demo-pills">
                {allWeddings.map((w) => {
                  const isActive = w.id === activeId;
                  const isDefault = w.id === defaultId;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => onSelectWedding(w.id)}
                      className={`demo-pill ${isActive ? 'active' : ''}`}
                    >
                      <span className="demo-pill-title">
                        {w.couple?.combined || `${w.couple?.groom} & ${w.couple?.bride}`}
                      </span>
                      <span className="demo-pill-lang">{getLanguageLabel(w.language)}</span>
                      {isDefault && <span className="demo-default-tag">{t.defaultBadge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="demo-actions">
              <button
                type="button"
                className={`demo-copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{copied ? t.copied : t.shareUrl}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
