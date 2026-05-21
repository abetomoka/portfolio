// Hamburger
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  // Theme switch
  const themeSwitch = document.getElementById('themeSwitch');
  const themeSwitchWrap = document.querySelector('.theme-switch');
  const themeStorage = {
    get() {
      try { return window.localStorage.getItem('portfolio-theme'); }
      catch (e) { return null; }
    },
    set(value) {
      try { window.localStorage.setItem('portfolio-theme', value); }
      catch (e) {}
    }
  };
  const savedTheme = themeStorage.get();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    themeSwitch.classList.toggle('on', isDark);
    themeSwitch.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeSwitch.setAttribute('aria-label', isDark ? 'ライトモードに切り替え' : 'ナイトモードに切り替え');
    themeStorage.set(isDark ? 'dark' : 'light');
  }

  setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
  function toggleTheme() {
    setTheme(!document.documentElement.classList.contains('dark'));
  }
  themeSwitch.addEventListener('click', toggleTheme);
  themeSwitchWrap.addEventListener('click', (e) => {
    if (e.target !== themeSwitch && !themeSwitch.contains(e.target)) toggleTheme();
  });

  const labelMap = {
    'ブランド': 'Brand',
    'グラフィックデザイン': 'Graphic',
    'マーケティング': 'Marketing',
    'コーディング': 'Coding',
    'アニメーション提案': 'Animation',
    'web': 'Web',
    'キャラクターデザイン': 'Character'
  };
  const tagClassMap = {
    'All': 'tag-all',
    'UI/UX': 'tag-uiux',
    'Web': 'tag-web',
    'Brand': 'tag-brand',
    'Graphic': 'tag-graphic',
    'Marketing': 'tag-marketing',
    'Coding': 'tag-coding',
    'Animation': 'tag-animation',
    'Character': 'tag-character'
  };

  function tagClass(tag) {
    return tagClassMap[tag] || 'tag-all';
  }

  function splitTags(card) {
    return card.dataset.tag.split('·').map(tag => tag.trim()).filter(Boolean).map(tag => labelMap[tag] || tag);
  }

  function renderTagChips(container, tags) {
    container.innerHTML = tags.map(tag => `<span class="tag-chip ${tagClass(tag)}">${escapeHtml(tag)}</span>`).join('');
  }

  const workCards = [...document.querySelectorAll('.work-card')];
  workCards.forEach(card => {
    const tags = splitTags(card);
    card.dataset.filters = tags.join('|');
    const tagArea = card.querySelector('.card-tag');
    if (tagArea) renderTagChips(tagArea, tags);
  });

  const worksFilter = document.getElementById('worksFilter');
  const filterOrder = ['All', 'UI/UX', 'Web', 'Brand', 'Graphic', 'Marketing', 'Coding', 'Animation', 'Character'];
  const tagCounts = workCards.reduce((acc, card) => {
    splitTags(card).forEach(tag => acc.set(tag, (acc.get(tag) || 0) + 1));
    return acc;
  }, new Map());
  const filterTags = filterOrder.filter(tag => tag === 'All' || tagCounts.has(tag));
  worksFilter.innerHTML = filterTags.map((tag, index) => {
    const count = tag === 'All' ? workCards.length : tagCounts.get(tag);
    return `<button class="filter-btn ${tagClass(tag)} ${index === 0 ? 'active' : ''}" type="button" data-filter="${tag}">${tag}<span class="filter-count">${count}</span></button>`;
  }).join('');
  worksFilter.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      worksFilter.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      workCards.forEach(card => {
        const tags = splitTags(card);
        card.classList.toggle('is-hidden', filter !== 'All' && !tags.includes(filter));
      });
    });
  });

  // Work modal
  const modal = document.getElementById('workModal');
  const modalClose = document.getElementById('modalClose');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const modalDetails = document.getElementById('modalDetails');
  const modalActions = document.getElementById('modalActions');
  const worksAccess = document.getElementById('worksAccess');
  const worksLockToggle = document.getElementById('worksLockToggle');
  const worksAccessForm = document.getElementById('worksAccessForm');
  const worksPasscode = document.getElementById('worksPasscode');
  const worksConsent = document.getElementById('worksConsent');
  const worksAccessError = document.getElementById('worksAccessError');
  const WORK_ACCESS_KEY = 'portfolioWorkAccessAllowed';
  const WORK_DETAILS_PAYLOAD = {"iterations":150000,"salt":"emGHZh/iHnuhdSBQo35s5w==","iv":"CqzkD+amWUxCJXoc","data":"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"};
  let currentWorkCard = null;
  let workAccessAllowed = false;
  let workDetails = null;

  function hasWorkAccess() {
    return workAccessAllowed && Boolean(workDetails);
  }

  function allowWorkAccess() {
    workAccessAllowed = true;
    updateWorkAccessPanel();
  }

  function base64ToBytes(value) {
    return Uint8Array.from(atob(value), char => char.charCodeAt(0));
  }

  async function decryptWorkDetails(passcode) {
    if (!window.crypto?.subtle) return null;
    try {
      const encodedPasscode = new TextEncoder().encode(passcode);
      const keyMaterial = await crypto.subtle.importKey('raw', encodedPasscode, 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: base64ToBytes(WORK_DETAILS_PAYLOAD.salt),
          iterations: WORK_DETAILS_PAYLOAD.iterations,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      const encrypted = base64ToBytes(WORK_DETAILS_PAYLOAD.data);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: base64ToBytes(WORK_DETAILS_PAYLOAD.iv) },
        key,
        encrypted
      );
      return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (e) {
      return null;
    }
  }

  async function unlockWorkDetails(passcode) {
    const details = await decryptWorkDetails(passcode);
    if (!details) return false;
    workDetails = details;
    allowWorkAccess();
    return true;
  }

  function updateWorkAccessPanel() {
    if (!worksAccess) return;
    const canViewDetails = hasWorkAccess();
    worksAccess.classList.toggle('is-unlocked', canViewDetails);
    worksAccess.closest('.works')?.classList.toggle('is-unlocked', canViewDetails);
    if (worksLockToggle) {
      worksLockToggle.classList.toggle('is-unlocked', canViewDetails);
      worksLockToggle.textContent = canViewDetails ? '🔓' : '🔒';
      worksLockToggle.setAttribute('aria-expanded', worksAccess.classList.contains('is-open') || canViewDetails ? 'true' : 'false');
      worksLockToggle.setAttribute('aria-label', canViewDetails ? '限定公開を解除済み' : '限定公開の入力欄を開く');
    }
    workCards.forEach(card => {
      card.setAttribute('aria-disabled', canViewDetails ? 'false' : 'true');
      card.tabIndex = canViewDetails ? 0 : -1;
    });
    if (worksAccessError) worksAccessError.classList.remove('show');
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function teamIcon(label) {
    if (label.includes('マーケ')) return 'M';
    if (label.includes('エンジニア') || label.includes('コーダー')) return 'E';
    if (label.includes('PM') || label.includes('ディレクター') || label.includes('上長')) return 'P';
    if (label.includes('デザイナー')) return 'D';
    if (label.includes('クライアント') || label.includes('先方') || label.includes('担当')) return 'C';
    return 'T';
  }

  function renderWorkContent(card) {
    const details = workDetails?.[card.dataset.workId] || {};
    modalTag.innerHTML = `<span class="modal-tag-mark">✦</span>${splitTags(card).map(tag => `<span class="modal-tag-chip ${tagClass(tag)}">${escapeHtml(tag)}</span>`).join('')}`;
    modalTitle.textContent = card.dataset.title;
    modalMeta.textContent = card.dataset.meta;
    if (card.dataset.image) {
      modalImage.src = card.dataset.image;
      modalImage.alt = `${card.dataset.title}のデザイン画像`;
      modalImage.style.display = '';
    } else {
      modalImage.removeAttribute('src');
      modalImage.alt = '';
      modalImage.style.display = 'none';
    }
    modalDesc.textContent = details.desc || '';
    const detailSections = [
      { title: 'プロセス', value: details.process, format: 'paragraph' },
      { title: '担当範囲', value: details.scope, format: 'list' },
      { title: 'チームメンバー', value: details.team, format: 'team' }
    ].filter(section => section.value);
    modalDetails.innerHTML = detailSections.map(section => {
      const delimiter = section.format === 'paragraph' ? '||' : ';';
      const items = section.value.split(delimiter).map(item => item.trim()).filter(Boolean);
      const content = section.format === 'paragraph'
        ? items.map(item => `<p>${escapeHtml(item)}</p>`).join('')
        : section.format === 'team'
          ? `<div class="team-graph">${items.map(item => `<div class="team-node"><span class="team-icon">${teamIcon(item)}</span><span class="team-label">${escapeHtml(item)}</span></div>`).join('')}</div>`
        : `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
      return `<details class="modal-detail" open><summary>${section.title}</summary><div class="modal-detail-body">${content}</div></details>`;
    }).join('');
    const links = (details.links || '').split(';').map(item => {
      const [label, url] = item.split('|');
      return { label: (label || '').trim(), url: (url || '').trim() };
    }).filter(link => link.label && link.url);
    modalActions.innerHTML = links.map(link => {
      return `<a class="modal-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener">↗ ${escapeHtml(link.label)}</a>`;
    }).join('');
  }

  function renderLockedWork(card) {
    modalTag.innerHTML = `<span class="modal-tag-mark">✦</span>${splitTags(card).map(tag => `<span class="modal-tag-chip ${tagClass(tag)}">${escapeHtml(tag)}</span>`).join('')}`;
    modalTitle.textContent = card.dataset.title;
    modalMeta.textContent = '詳細閲覧にはパスコードが必要です';
    if (card.dataset.image) {
      modalImage.src = card.dataset.image;
      modalImage.alt = `${card.dataset.title}のデザイン画像`;
      modalImage.style.display = '';
    } else {
      modalImage.removeAttribute('src');
      modalImage.alt = '';
      modalImage.style.display = 'none';
    }
    modalDesc.textContent = '案件の存在と概要は掲載していますが、詳細な制作プロセスや担当範囲は限定公開です。閲覧をご希望の方は、パスコードをご入力ください。';
    modalDetails.innerHTML = `
      <div class="modal-guard">
        <div class="modal-guard-title">限定公開の実績です</div>
        <p class="modal-guard-text">パスコード入力後、注意事項に同意いただくと詳細をご覧いただけます。</p>
        <form class="modal-guard-form" id="workGuardForm">
          <input class="modal-passcode" id="workPasscode" type="password" autocomplete="current-password" placeholder="パスコードを入力">
          <label class="modal-consent">
            <span>公開不可のものも含めて抜粋して載せております。外部公開はお控えください。</span>
            <span><input id="workConsent" type="checkbox"> 理解した</span>
          </label>
          <div class="modal-guard-error" id="workGuardError">パスコードと同意チェックをご確認ください。</div>
          <button class="modal-guard-submit" type="submit">詳細を見る</button>
        </form>
      </div>
    `;
    modalActions.innerHTML = '';

    const form = document.getElementById('workGuardForm');
    const passcodeInput = document.getElementById('workPasscode');
    const consentInput = document.getElementById('workConsent');
    const error = document.getElementById('workGuardError');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (consentInput.checked && await unlockWorkDetails(passcodeInput.value.trim())) {
        renderWorkContent(card);
        modal.scrollTo({ top: 0, behavior: 'smooth' });
        modalClose.focus();
      } else {
        error.classList.add('show');
      }
    });
  }

  if (worksAccessForm) {
    worksAccessForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (worksConsent.checked && await unlockWorkDetails(worksPasscode.value.trim())) {
        worksPasscode.value = '';
      } else {
        worksAccessError.classList.add('show');
      }
    });
  }

  if (worksLockToggle) {
    worksLockToggle.addEventListener('click', () => {
      worksAccess.classList.toggle('is-open');
      updateWorkAccessPanel();
      if (worksAccess.classList.contains('is-open') && !hasWorkAccess()) {
        worksPasscode.focus();
      }
    });
  }

  updateWorkAccessPanel();

  function openWorkModal(card) {
    if (!hasWorkAccess()) return;
    currentWorkCard = card;
    const canViewDetails = hasWorkAccess();
    if (canViewDetails) {
      renderWorkContent(card);
    } else {
      renderLockedWork(card);
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (canViewDetails) {
      modalClose.focus();
    } else {
      const passcodeInput = document.getElementById('workPasscode');
      if (passcodeInput) passcodeInput.focus();
    }
  }

  function closeWorkModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentWorkCard = null;
  }

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => openWorkModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWorkModal(card);
      }
    });
  });

  modalClose.addEventListener('click', closeWorkModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeWorkModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeWorkModal();
  });

  // About emoji carousel
  const aboutPhoto = document.querySelector('.about-photo');
  const aboutEmoji = document.getElementById('aboutEmoji');
  const aboutEmojiItems = [
    { icon: '🌸', bg: ['#FFD6E3', '#DDF2FF'], glow: 'rgba(255,140,171,0.24)' },
    { icon: '👒', bg: ['#FFF2B8', '#DDF2FF'], glow: 'rgba(255,211,105,0.22)' },
    { icon: '🐣', bg: ['#FFF4B8', '#FFE2C8'], glow: 'rgba(255,210,88,0.24)' },
    { icon: '🫎', bg: ['#F5E1CB', '#DDF2FF'], glow: 'rgba(176,125,76,0.18)' },
    { icon: '🦭', bg: ['#DDF2FF', '#F1E8FF'], glow: 'rgba(98,198,255,0.20)' },
    { icon: '🐾', bg: ['#FFE2D1', '#FFF7C8'], glow: 'rgba(255,153,103,0.20)' },
    { icon: '🌻', bg: ['#FFF0A8', '#DDF6D5'], glow: 'rgba(255,205,60,0.24)' },
    { icon: '🫧', bg: ['#DDF2FF', '#E8FFF8'], glow: 'rgba(98,198,255,0.22)' },
    { icon: '🧀', bg: ['#FFE08A', '#FFF4C8'], glow: 'rgba(255,197,61,0.22)' },
    { icon: '🍒', bg: ['#FFD6E3', '#FFE8F1'], glow: 'rgba(255,92,138,0.20)' },
    { icon: '🧁', bg: ['#FFE1F0', '#F1E8FF'], glow: 'rgba(201,86,145,0.18)' },
    { icon: '🪄', bg: ['#F1E8FF', '#DDF2FF'], glow: 'rgba(155,104,255,0.20)' }
  ];
  let aboutEmojiIndex = 0;

  function applyAboutEmoji(item) {
    if (!aboutPhoto || !aboutEmoji) return;
    aboutPhoto.style.setProperty('--emoji-bg-1', item.bg[0]);
    aboutPhoto.style.setProperty('--emoji-bg-2', item.bg[1]);
    aboutPhoto.style.boxShadow = `0 24px 70px ${item.glow}, var(--shadow-floating)`;
    aboutEmoji.textContent = item.icon;
  }

  if (aboutPhoto && aboutEmoji) {
    applyAboutEmoji(aboutEmojiItems[0]);
    window.setInterval(() => {
      aboutEmoji.classList.add('is-switching');
      window.setTimeout(() => {
        aboutEmojiIndex = (aboutEmojiIndex + 1) % aboutEmojiItems.length;
        applyAboutEmoji(aboutEmojiItems[aboutEmojiIndex]);
        aboutEmoji.classList.remove('is-switching');
      }, 900);
    }, 6200);
  }

  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.work-card, .career-item, .service-item, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.35s, background 0.3s';
    observer.observe(el);
  });
