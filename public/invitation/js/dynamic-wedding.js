(function() {
  'use strict';

  let weddingsData = null;

  function getQueryOrHashId() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryId = urlParams.get('id') || urlParams.get('wedding');
      if (queryId) return queryId;

      const hash = window.location.hash.replace(/^#\/?(wedding\/)?/, '').trim();
      if (hash) return hash;

      // Check parent if inside iframe
      if (window.parent && window.parent !== window) {
        try {
          const parentParams = new URLSearchParams(window.parent.location.search);
          const parentId = parentParams.get('id') || parentParams.get('wedding');
          if (parentId) return parentId;

          const parentHash = window.parent.location.hash.replace(/^#\/?(wedding\/)?/, '').trim();
          if (parentHash) return parentHash;
        } catch {
          // Ignore parent cross-origin access errors
        }
      }
    } catch {
      // Ignore
    }
    return null;
  }

  function applyRtlStyles(isRtl) {
    let styleEl = document.getElementById('dynamic-wedding-rtl-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-wedding-rtl-style';
      document.head.appendChild(styleEl);
    }

    if (isRtl) {
      document.documentElement.dir = 'rtl';
      document.body.dir = 'rtl';
      styleEl.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Scheherazade+New:wght@400;600;700&family=Vazirmatn:wght@300;400;500;600;700;800&family=Alexandria:wght@300;400;500;600;700&display=swap');

        /* ------------------------------------------------------------------
           Base Typography for Kurdish Sorani & Arabic RTL
           ------------------------------------------------------------------ */
        body, .t-records, .t396__artboard, .tn-atom, .t-text, .t-title, .t-name, .t-descr, input, button, select, textarea, .tdr-root {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', 'Amiri', 'Scheherazade New', serif !important;
          direction: rtl !important;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          letter-spacing: normal !important;
          word-spacing: normal !important;
        }

        /* ------------------------------------------------------------------
           Envelope Cover & Seal (rec2442650973)
           ------------------------------------------------------------------ */
        [field="tn_text_1777183175514000001"] {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-size: clamp(14px, 3.5vw, 18px) !important;
          line-height: 1.35 !important;
          font-weight: 600 !important;
          text-align: center !important;
        }

        /* ------------------------------------------------------------------
           Hero Section: Couple Names & Subtitle (rec2442650993)
           ------------------------------------------------------------------ */
        #rec2442650993 .tn-elem[data-elem-id="1776948176126"] {
          width: 100% !important;
          left: 0 !important;
          text-align: center !important;
        }
        [field="tn_text_1776948176126"] {
          font-family: 'Amiri', 'Scheherazade New', serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.5px !important;
          line-height: 1.35 !important;
          font-size: clamp(30px, 7vw, 48px) !important;
          text-align: center !important;
        }
        #rec2442650993 .tn-elem[data-elem-id="1730310670432"] {
          width: 100% !important;
          left: 0 !important;
          text-align: center !important;
        }
        [field="tn_text_1730310670432"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-weight: 600 !important;
          font-size: clamp(16px, 3.8vw, 22px) !important;
          line-height: 1.4 !important;
          text-align: center !important;
        }

        /* ------------------------------------------------------------------
           Date Reveal & Scratch Card (rec2442651003)
           ------------------------------------------------------------------ */
        #rec2442651003 .tn-elem[data-elem-id="1776947474965000001"] {
          width: 100% !important;
          left: 0 !important;
          text-align: center !important;
        }
        [field="tn_text_1776947474965000001"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(26px, 5.5vw, 38px) !important;
          font-weight: 700 !important;
          text-align: center !important;
        }
        #rec2442651003 .tn-elem[data-elem-id="1776859758252000001"] {
          width: 100% !important;
          left: 0 !important;
          text-align: center !important;
        }
        [field="tn_text_1776859758252000001"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', sans-serif !important;
          font-size: clamp(13px, 3vw, 16px) !important;
          text-align: center !important;
        }
        #rec2442651003 .tn-elem[data-elem-id="1776856626015"] {
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(490px, 94vw) !important;
        }
        .tdr-num {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-weight: 700 !important;
        }
        .tdr-num.tdr-month {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(14px, 3.5vw, 19px) !important;
          font-weight: 600 !important;
          line-height: 1.2 !important;
        }
        .tdr-label {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', sans-serif !important;
          letter-spacing: 0.5px !important;
          font-weight: 500 !important;
          font-size: clamp(10px, 2.2vw, 12px) !important;
        }
        .tdr-married {
          font-family: 'Amiri', 'Scheherazade New', serif !important;
          font-size: clamp(20px, 5vw, 28px) !important;
          font-weight: 700 !important;
        }

        /* ------------------------------------------------------------------
           Welcome Letter Section (rec2442651013)
           FIX: Prevents title collision with body text & card overflow
           ------------------------------------------------------------------ */
        /* Expand and center the paper card so long Kurdish text fits cleanly */
        #rec2442651013 .tn-elem[data-elem-id="1772528297316"] {
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(340px, 88vw) !important;
          top: 155px !important;
          height: 355px !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
        }

        /* Welcome Title: centered and nicely proportioned */
        #rec2442651013 .tn-elem[data-elem-id="1705235414679"] {
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(320px, 86vw) !important;
          top: 185px !important;
          text-align: center !important;
          z-index: 5 !important;
        }
        #rec2442651013 [field="tn_text_1705235414679"] {
          font-family: 'Amiri', 'Noto Naskh Arabic', serif !important;
          font-weight: 700 !important;
          font-size: clamp(19px, 4.4vw, 25px) !important;
          line-height: 1.3 !important;
          text-align: center !important;
          white-space: nowrap !important;
          color: #2b2b2b !important;
        }

        /* Welcome Message Paragraph: perfectly sized inside the paper card */
        #rec2442651013 .tn-elem[data-elem-id="1705235414678"] {
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(295px, 80vw) !important;
          top: 236px !important;
          text-align: center !important;
          z-index: 5 !important;
        }
        #rec2442651013 [field="tn_text_1705235414678"] {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-weight: 500 !important;
          font-size: clamp(12.5px, 2.65vw, 14px) !important;
          line-height: 1.62 !important;
          color: #444444 !important;
          text-align: center !important;
          word-spacing: normal !important;
        }

        @media (max-width: 480px) {
          #rec2442651013 .tn-elem[data-elem-id="1772528297316"] {
            top: 150px !important;
            height: 350px !important;
          }
          #rec2442651013 .tn-elem[data-elem-id="1705235414679"] {
            top: 178px !important;
          }
          #rec2442651013 [field="tn_text_1705235414679"] {
            font-size: 18.5px !important;
          }
          #rec2442651013 .tn-elem[data-elem-id="1705235414678"] {
            top: 226px !important;
            width: 82% !important;
          }
          #rec2442651013 [field="tn_text_1705235414678"] {
            font-size: 12px !important;
            line-height: 1.55 !important;
          }
        }

        /* ------------------------------------------------------------------
           Schedule of Events (rec2442651033)
           FIX: Layering behind clouds & unblocked timeline text
           ------------------------------------------------------------------ */
        #rec2442651033 [field="tn_text_1763405219328"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(26px, 5.5vw, 38px) !important;
          font-weight: 700 !important;
          text-align: center !important;
          width: 100% !important;
          left: 0 !important;
        }
        #rec2442651033 .t396__group {
          overflow: visible !important;
          z-index: 6 !important;
        }
        #rec2442651033 .tn-elem {
          overflow: visible !important;
        }
        #rec2442651033 [field="tn_text_1772803062504"],
        #rec2442651033 [field="tn_text_1772803288793000003"],
        #rec2442651033 [field="tn_text_1772803465944000006"],
        #rec2442651033 [field="tn_text_1776687683335000002"],
        #rec2442651033 [field="tn_text_1772803619332000009"],
        #rec2442651033 [field="tn_text_1776878815963000013"] {
          font-family: 'Vazirmatn', sans-serif !important;
          font-weight: 700 !important;
          font-size: clamp(20px, 4.5vw, 26px) !important;
          direction: rtl !important;
        }
        #rec2442651033 [field="tn_text_1763405268776"],
        #rec2442651033 [field="tn_text_1772803288793000002"],
        #rec2442651033 [field="tn_text_1772803465944000005"],
        #rec2442651033 [field="tn_text_1776687683335000001"],
        #rec2442651033 [field="tn_text_1772803619332000008"],
        #rec2442651033 [field="tn_text_1776878815963000012"] {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-weight: 600 !important;
          font-size: clamp(13px, 2.8vw, 16px) !important;
          line-height: 1.35 !important;
          direction: rtl !important;
        }
        @media (max-width: 768px) {
          #rec2442651033 .tn-elem[data-elem-id="1776876503947"],
          #rec2442651033 .tn-elem[data-elem-id="1776876608318000001"] {
            opacity: 0.45 !important;
          }
        }

        /* ------------------------------------------------------------------
           Venue Section (rec2442651083)
           ------------------------------------------------------------------ */
        #rec2442651083 [field="tn_text_1776866271348000001"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(26px, 5.5vw, 38px) !important;
          font-weight: 700 !important;
          text-align: center !important;
          width: 100% !important;
          left: 0 !important;
        }
        #rec2442651083 [field="tn_text_1776866271348000003"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(17px, 3.8vw, 22px) !important;
          font-weight: 700 !important;
          direction: rtl !important;
          text-align: right !important;
        }
        #rec2442651083 [field="tn_text_1776866271348000004"] {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-size: clamp(13px, 2.7vw, 16px) !important;
          direction: rtl !important;
          text-align: right !important;
          line-height: 1.4 !important;
        }

        /* ------------------------------------------------------------------
           Dress Code Section (rec2442651093 & rec2442651113)
           FIX: Prevents heading collision with intro & fixes RTL alignment
           ------------------------------------------------------------------ */
        #rec2442651093 .tn-elem[data-elem-id="1741427070967"] {
          width: 100% !important;
          left: 0 !important;
          top: 46px !important;
          text-align: center !important;
        }
        #rec2442651093 [field="tn_text_1741427070967"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-weight: 700 !important;
          font-size: clamp(24px, 5.2vw, 36px) !important;
          text-align: center !important;
          white-space: nowrap !important;
          line-height: 1.3 !important;
        }
        #rec2442651093 .tn-elem[data-elem-id="1741427070972"] {
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(480px, 92vw) !important;
          top: 108px !important;
          text-align: center !important;
        }
        #rec2442651093 [field="tn_text_1741427070972"] {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-size: clamp(13.5px, 3.1vw, 16.5px) !important;
          line-height: 1.55 !important;
          text-align: center !important;
        }
        /* Hide English "scroll --->" arrow in RTL */
        #rec2442651093 .tn-elem[data-elem-id="1741431382522"] {
          display: none !important;
        }

        /* rec2442651113: Colors label & guidance */
        #rec2442651113 [field="tn_text_1741430557573"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', sans-serif !important;
          font-weight: 600 !important;
          font-size: 16px !important;
          direction: rtl !important;
        }
        #rec2442651113 .tn-elem[data-elem-id="1741430557592"] {
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(460px, 92vw) !important;
          top: 125px !important;
          text-align: right !important;
          direction: rtl !important;
        }
        #rec2442651113 [field="tn_text_1741430557592"] {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-size: clamp(13px, 2.9vw, 15px) !important;
          line-height: 1.65 !important;
          text-align: right !important;
          direction: rtl !important;
        }

        /* ------------------------------------------------------------------
           RSVP Section & Modal Form (rec2442651143 & rec2442651153)
           ------------------------------------------------------------------ */
        #rec2442651143 [field="tn_text_1763405219328"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(26px, 5.5vw, 38px) !important;
          font-weight: 700 !important;
          text-align: center !important;
          width: 100% !important;
          left: 0 !important;
        }
        #rec2442651143 .tn-elem[data-elem-id="1772813849329000001"] {
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(520px, 90vw) !important;
        }
        #rec2442651143 [field="tn_text_1772813849329000001"] {
          font-family: 'Vazirmatn', 'Noto Naskh Arabic', sans-serif !important;
          font-size: clamp(13.5px, 3vw, 16px) !important;
          text-align: center !important;
          line-height: 1.55 !important;
        }
        #rec2442651143 .tn-elem[data-elem-id="1772823143441"] {
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: min(180px, 55vw) !important;
        }
        #rec2442651143 .tn-atom__button-inner {
          font-family: 'Vazirmatn', sans-serif !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          letter-spacing: 0.5px !important;
        }

        /* Popup Form Modal */
        #rec2442651153 .t702__title {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(22px, 5vw, 28px) !important;
          font-weight: 700 !important;
          text-align: center !important;
          direction: rtl !important;
          margin-bottom: 8px !important;
        }
        #rec2442651153 .t702__descr {
          font-family: 'Vazirmatn', sans-serif !important;
          font-size: clamp(13px, 3vw, 15px) !important;
          text-align: center !important;
          direction: rtl !important;
          color: #666 !important;
          margin-bottom: 20px !important;
        }
        #rec2442651153 .t-input-title {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', sans-serif !important;
          font-weight: 600 !important;
          direction: rtl !important;
          text-align: right !important;
          margin-bottom: 6px !important;
        }
        #rec2442651153 .t-input {
          direction: rtl !important;
          text-align: right !important;
          font-family: 'Vazirmatn', sans-serif !important;
          font-size: 15px !important;
          border-radius: 8px !important;
        }
        #rec2442651153 .t-checkboxes__wrapper {
          direction: rtl !important;
          text-align: right !important;
        }
        #rec2442651153 .t-checkboxes__item {
          direction: rtl !important;
          text-align: right !important;
          display: flex !important;
          flex-direction: row-reverse !important;
          justify-content: flex-end !important;
          align-items: center !important;
          gap: 12px !important;
          margin-bottom: 10px !important;
        }
        #rec2442651153 .t-checkboxes__item span {
          font-family: 'Vazirmatn', sans-serif !important;
          font-size: 14.5px !important;
          direction: rtl !important;
        }
        #rec2442651153 .t-submit button {
          font-family: 'Vazirmatn', sans-serif !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          border-radius: 25px !important;
        }

        /* ------------------------------------------------------------------
           Footer Section (rec2442651163)
           ------------------------------------------------------------------ */
        #rec2442651163 [field="tn_text_1710522265387"] {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif !important;
          font-size: clamp(22px, 5vw, 30px) !important;
          text-align: center !important;
          width: 100% !important;
          left: 0 !important;
          line-height: 1.4 !important;
        }
        #rec2442651163 [field="tn_text_1710522265391"] {
          font-family: 'Amiri', 'Scheherazade New', serif !important;
          font-size: clamp(26px, 6vw, 36px) !important;
          text-align: center !important;
          width: 100% !important;
          left: 0 !important;
        }
      `;
    } else {
      document.documentElement.dir = 'ltr';
      document.body.dir = 'ltr';
      styleEl.innerHTML = '';
    }
  }

  function setElementText(selector, text) {
    if (!text) return;
    const el = document.querySelector(selector);
    if (el) {
      el.textContent = text;
    }
  }

  function updateDomWithWedding(wedding) {
    if (!wedding) return;

    // 1. Language & Direction
    const isRtl = wedding.direction === 'rtl';
    applyRtlStyles(isRtl);

    // 2. Document title
    const groom = wedding.couple?.groom || '';
    const bride = wedding.couple?.bride || '';
    const coupleCombined = wedding.couple?.combined || `${groom} & ${bride}`;
    document.title = `${coupleCombined} | ${wedding.couple?.subtitle || 'Dolce Vita'}`;

    // 3. Envelope Cover & Seal
    setElementText('[field="tn_text_1777183175514000001"]', wedding.sealText);

    // 4. Hero Section
    setElementText('[field="tn_text_1776948176126"]', coupleCombined);
    setElementText('[field="tn_text_1730310670432"]', wedding.hero?.areGettingMarried || wedding.couple?.subtitle);

    // 5. Date Reveal & Scratch Card Section
    if (wedding.dateReveal) {
      setElementText('[field="tn_text_1776947474965000001"]', wedding.dateReveal.title);
      setElementText('[field="tn_text_1776859758252000001"]', wedding.dateReveal.scratchInstruction);

      setElementText('#tdr-tile-day .tdr-num', wedding.dateReveal.day);
      setElementText('#tdr-tile-month .tdr-num', wedding.dateReveal.month);
      setElementText('#tdr-tile-year .tdr-num', wedding.dateReveal.year);

      const panels = document.querySelectorAll('.tdr-panel .tdr-label');
      if (panels.length >= 3) {
        panels[0].textContent = wedding.dateReveal.dayLabel || 'Day';
        panels[1].textContent = wedding.dateReveal.monthLabel || 'Month';
        panels[2].textContent = wedding.dateReveal.yearLabel || 'Year';
      }

      setElementText('#tdr-married', wedding.dateReveal.revealBanner);
    }

    // 6. Welcome Letter Section
    if (wedding.welcome) {
      setElementText('[field="tn_text_1705235414679"]', wedding.welcome.title);
      setElementText('[field="tn_text_1705235414678"]', wedding.welcome.message);
    }

    // 7. Schedule of Events
    if (wedding.schedule) {
      setElementText('#rec2442651033 [field="tn_text_1763405219328"]', wedding.schedule.heading);

      const items = wedding.schedule.items || [];
      const scheduleMappings = [
        { timeSel: '[field="tn_text_1772803062504"]', titleSel: '[field="tn_text_1763405268776"]' },
        { timeSel: '[field="tn_text_1772803288793000003"]', titleSel: '[field="tn_text_1772803288793000002"]' },
        { timeSel: '[field="tn_text_1772803465944000006"]', titleSel: '[field="tn_text_1772803465944000005"]' },
        { timeSel: '[field="tn_text_1776687683335000002"]', titleSel: '[field="tn_text_1776687683335000001"]' },
        { timeSel: '[field="tn_text_1772803619332000009"]', titleSel: '[field="tn_text_1772803619332000008"]' },
        { timeSel: '[field="tn_text_1776878815963000013"]', titleSel: '[field="tn_text_1776878815963000012"]' }
      ];

      items.forEach((item, idx) => {
        if (scheduleMappings[idx]) {
          setElementText(scheduleMappings[idx].timeSel, item.time);
          setElementText(scheduleMappings[idx].titleSel, item.title);
        }
      });
    }

    // 8. Venue Section
    if (wedding.venue) {
      setElementText('[field="tn_text_1776866271348000001"]', wedding.venue.heading);
      setElementText('[field="tn_text_1776866271348000003"]', wedding.venue.name);
      setElementText('[field="tn_text_1776866271348000004"]', wedding.venue.address);

      if (wedding.venue.mapUrl) {
        const venueBlock = document.querySelector('#rec2442651083 .t396__artboard');
        if (venueBlock && !venueBlock.dataset.mapAdded) {
          venueBlock.style.cursor = 'pointer';
          venueBlock.addEventListener('click', () => {
            window.open(wedding.venue.mapUrl, '_blank', 'noopener,noreferrer');
          });
          venueBlock.dataset.mapAdded = 'true';
        }
      }
    }

    // 9. Dress Code Section
    if (wedding.dressCode) {
      setElementText('[field="tn_text_1741427070967"]', wedding.dressCode.heading);
      setElementText('[field="tn_text_1741427070972"]', wedding.dressCode.intro);
      setElementText('[field="tn_text_1741430557573"]', wedding.dressCode.colorsLabel);
      setElementText('[field="tn_text_1741430557592"]', wedding.dressCode.guidance);
    }

    // 10. RSVP Section & Modal Form
    if (wedding.rsvp) {
      setElementText('#rec2442651143 [field="tn_text_1763405219328"]', wedding.rsvp.heading);
      setElementText('[field="tn_text_1772813849329000001"]', wedding.rsvp.sub);
      
      // Page RSVP Button
      setElementText('#rec2442651143 [data-elem-id="1772823143441"] .tn-atom__button-inner', wedding.rsvp.buttonLabel || 'RSVP');

      // Popup Form Modal Elements
      setElementText('#rec2442651153 .t702__title', wedding.rsvp.modalTitle || wedding.rsvp.heading);
      setElementText('#rec2442651153 .t702__descr', wedding.rsvp.modalSubtitle || wedding.rsvp.sub);

      setElementText('[field="li_title__2221855674630"]', wedding.rsvp.nameLabel);
      const nameInput = document.getElementById('input_2221855674630');
      if (nameInput && wedding.rsvp.namePlaceholder) {
        nameInput.placeholder = wedding.rsvp.namePlaceholder;
      }

      setElementText('[field="li_title__2221855674631"]', wedding.rsvp.attendLabel);

      if (wedding.rsvp.options && wedding.rsvp.options.length >= 3) {
        const optionSpans = document.querySelectorAll('#rec2442651153 .t-checkboxes__item span');
        wedding.rsvp.options.forEach((opt, idx) => {
          if (optionSpans[idx]) {
            optionSpans[idx].textContent = opt;
          }
        });
      }

      setElementText('[field="li_title__2221855674632"]', wedding.rsvp.foodLabel);
      const foodInput = document.getElementById('input_2221855674632');
      if (foodInput && wedding.rsvp.foodPlaceholder) {
        foodInput.placeholder = wedding.rsvp.foodPlaceholder;
      }

      setElementText('#rec2442651153 button.t-submit .t-btnflex__text', wedding.rsvp.submitLabel);
    }

    // 11. Footer Section
    if (wedding.footer) {
      setElementText('[field="tn_text_1710522265387"]', wedding.footer.seeYou);
      setElementText('[field="tn_text_1710522265391"]', wedding.footer.couple || coupleCombined);
    }
  }

  function applyWeddingById(weddingId) {
    if (!weddingsData) return;
    const targetId = weddingId || getQueryOrHashId() || weddingsData.defaultId;
    const selected = weddingsData.weddings[targetId] || weddingsData.weddings[weddingsData.defaultId];
    if (selected) {
      updateDomWithWedding(selected);
    }
  }

  function setupFormStorage() {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function () {
        const emailInput = form.querySelector("input[name='email']");
        if (emailInput && emailInput.value) {
          localStorage.setItem("user_email", emailInput.value);
        }
      });
    }
  }

  function initDynamicWedding() {
    setupFormStorage();

    fetch('/data/weddings.json')
      .then((res) => res.json())
      .then((data) => {
        weddingsData = data;
        applyWeddingById();

        // Re-apply after small delays to ensure Tilda scripts have fully rendered zero-blocks
        setTimeout(() => applyWeddingById(), 100);
        setTimeout(() => applyWeddingById(), 400);
        setTimeout(() => applyWeddingById(), 1000);
      })
      .catch((err) => {
        console.warn('Failed to load /data/weddings.json:', err);
      });

    // Listen for postMessage from parent (e.g. React DemoBar)
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CHANGE_WEDDING') {
        applyWeddingById(event.data.id);
      }
    });

    // Listen for hashchange
    window.addEventListener('hashchange', () => {
      applyWeddingById();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicWedding);
  } else {
    initDynamicWedding();
  }
})();
