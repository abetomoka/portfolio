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
  const WORK_DETAILS_PAYLOAD = {"iterations":150000,"salt":"thsJ8xnJrYlR1zhcjGji5w==","iv":"/DgIrtaeh7Wpw5PN","data":"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"};
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

  // Interactive soap bubbles for the About visual
  const aboutBubbleCanvas = document.getElementById('aboutBubbles3d');

  function startBubbleFallback(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    const bubbles = [
      { x: 0.22, y: 0.28, r: 70, vx: 0.25, vy: -0.16, hue: '255,214,227', pop: 0 },
      { x: 0.72, y: 0.22, r: 96, vx: -0.18, vy: 0.12, hue: '210,242,255', pop: 0 },
      { x: 0.56, y: 0.64, r: 118, vx: 0.12, vy: -0.1, hue: '255,236,178', pop: 0 },
      { x: 0.16, y: 0.72, r: 84, vx: 0.22, vy: 0.1, hue: '221,220,255', pop: 0 },
      { x: 0.88, y: 0.62, r: 62, vx: -0.2, vy: -0.14, hue: '206,250,235', pop: 0 }
    ];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function resetBubble(bubble) {
      bubble.x = 0.12 + Math.random() * 0.76;
      bubble.y = 0.12 + Math.random() * 0.76;
      bubble.r = 58 + Math.random() * 74;
      bubble.pop = 0;
    }

    canvas.addEventListener('pointerdown', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = bubbles.find((bubble) => {
        const dx = x - bubble.x * rect.width;
        const dy = y - bubble.y * rect.height;
        return Math.hypot(dx, dy) < bubble.r;
      });
      if (hit) hit.pop = 1;
    });

    function draw() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const t = frame * 0.012;
      bubbles.forEach((bubble, index) => {
        bubble.x += bubble.vx * 0.0008;
        bubble.y += bubble.vy * 0.0008;
        if (bubble.x < -0.05) bubble.x = 1.05;
        if (bubble.x > 1.05) bubble.x = -0.05;
        if (bubble.y < -0.05) bubble.y = 1.05;
        if (bubble.y > 1.05) bubble.y = -0.05;

        if (bubble.pop > 0) {
          const cx = bubble.x * rect.width;
          const cy = bubble.y * rect.height;
          ctx.beginPath();
          ctx.arc(cx, cy, bubble.r * (1.15 + (1 - bubble.pop) * 0.8), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${bubble.hue}, ${bubble.pop * 0.42})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          bubble.pop -= 0.045;
          if (bubble.pop <= 0) resetBubble(bubble);
          return;
        }

        const cx = bubble.x * rect.width + Math.sin(t + index) * 9;
        const cy = bubble.y * rect.height + Math.cos(t * 0.8 + index) * 11;
        const radius = bubble.r + Math.sin(t * 1.2 + index) * 5;
        const gradient = ctx.createRadialGradient(cx - radius * 0.34, cy - radius * 0.32, radius * 0.06, cx, cy, radius);
        gradient.addColorStop(0, 'rgba(255,255,255,0.78)');
        gradient.addColorStop(0.42, `rgba(${bubble.hue}, 0.22)`);
        gradient.addColorStop(1, `rgba(${bubble.hue}, 0.04)`);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.36)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });
      frame += 1;
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  async function startThreeBubbles(canvas) {
    if (!canvas) return;
    try {
      const THREE = await import('https://unpkg.com/three@0.164.1/build/three.module.js');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 8);

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const bubbleGroup = new THREE.Group();
      scene.add(bubbleGroup);

      const geometry = new THREE.SphereGeometry(1, 54, 54);
      const bubbleData = [
        { x: -2.8, y: 1.55, z: -1.2, s: 0.82, color: 0xffd6e3 },
        { x: 2.55, y: 1.2, z: -0.8, s: 1.08, color: 0xcff1ff },
        { x: 0.55, y: -1.45, z: -1.6, s: 1.34, color: 0xffefbd },
        { x: -2.2, y: -1.32, z: -0.4, s: 0.92, color: 0xdedaff },
        { x: 3.05, y: -0.75, z: -1.4, s: 0.72, color: 0xd5f8eb },
        { x: -0.2, y: 1.85, z: -2.0, s: 0.64, color: 0xffffff },
        { x: 1.72, y: 0.05, z: -2.2, s: 0.48, color: 0xffd7bd }
      ];

      const bubbles = bubbleData.map((data, index) => {
        const material = new THREE.MeshPhysicalMaterial({
          color: data.color,
          transparent: true,
          opacity: 0.34,
          roughness: 0.05,
          metalness: 0,
          transmission: 0.72,
          thickness: 0.9,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
          ior: 1.2,
          depthWrite: false
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(data.x, data.y, data.z);
        mesh.scale.setScalar(data.s);
        mesh.userData.base = { ...data, phase: index * 0.72 };

        const rim = new THREE.Mesh(
          geometry,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.12,
            wireframe: true,
            depthWrite: false
          })
        );
        rim.scale.setScalar(1.018);
        mesh.add(rim);
        bubbleGroup.add(mesh);
        return { mesh, material, rim, pop: 0 };
      });

      scene.add(new THREE.AmbientLight(0xffffff, 2.1));
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
      keyLight.position.set(2.2, 3.4, 4);
      scene.add(keyLight);
      const candyLight = new THREE.PointLight(0xffb3d5, 4.5, 9);
      candyLight.position.set(-3, -1.7, 3);
      scene.add(candyLight);
      const blueLight = new THREE.PointLight(0x9fdaff, 4.2, 9);
      blueLight.position.set(3.2, 1.6, 3);
      scene.add(blueLight);

      function resize() {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      function resetBubble(item) {
        const base = item.mesh.userData.base;
        item.mesh.position.set(base.x + (Math.random() - 0.5) * 0.8, base.y + (Math.random() - 0.5) * 0.5, base.z);
        item.mesh.scale.setScalar(base.s * 0.2);
        item.material.opacity = 0;
        item.rim.material.opacity = 0;
        item.pop = -1;
      }

      function popBubble(mesh) {
        const item = bubbles.find((bubble) => bubble.mesh === mesh);
        if (!item || item.pop > 0) return;
        item.pop = 1;
      }

      canvas.addEventListener('pointerdown', (event) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(bubbles.map((bubble) => bubble.mesh), false);
        if (hits.length) popBubble(hits[0].object);
      });

      function animate(time) {
        const t = time * 0.001;
        bubbles.forEach((item, index) => {
          const base = item.mesh.userData.base;
          const driftX = Math.sin(t * 0.42 + base.phase) * 0.22;
          const driftY = Math.cos(t * 0.36 + base.phase) * 0.18;
          item.mesh.position.x += ((base.x + driftX) - item.mesh.position.x) * 0.018;
          item.mesh.position.y += ((base.y + driftY) - item.mesh.position.y) * 0.018;
          item.mesh.rotation.x = Math.sin(t * 0.36 + index) * 0.18;
          item.mesh.rotation.y += 0.003 + index * 0.0004;

          if (item.pop > 0) {
            const burst = 1 + (1 - item.pop) * 0.95;
            item.mesh.scale.setScalar(base.s * burst);
            item.material.opacity = 0.34 * item.pop;
            item.rim.material.opacity = 0.18 * item.pop;
            item.pop -= 0.052;
            if (item.pop <= 0) resetBubble(item);
            return;
          }

          if (item.pop < 0) {
            const nextOpacity = Math.min(0.34, item.material.opacity + 0.012);
            const nextScale = Math.min(base.s, item.mesh.scale.x + base.s * 0.025);
            item.material.opacity = nextOpacity;
            item.rim.material.opacity = Math.min(0.12, item.rim.material.opacity + 0.005);
            item.mesh.scale.setScalar(nextScale);
            if (nextScale >= base.s && nextOpacity >= 0.34) item.pop = 0;
            return;
          }

          const pulse = 1 + Math.sin(t * 1.05 + base.phase) * 0.045;
          item.mesh.scale.setScalar(base.s * pulse);
          item.material.opacity = 0.27 + Math.sin(t * 0.7 + base.phase) * 0.04;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      resize();
      window.addEventListener('resize', resize);
      requestAnimationFrame(animate);
    } catch (e) {
      startBubbleFallback(canvas);
    }
  }

  startThreeBubbles(aboutBubbleCanvas);

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
