// Hamburger
const btn = document.getElementById('hamburger');
const nav = document.getElementById('navLinks');
btn.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Filter
document.querySelectorAll('.filter-btn').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
});

// Contact form
function handleContact(e) {
  e.preventDefault();
  const email = document.getElementById('contactEmail').value;
  if (email) {
    alert('ありがとうございます！' + email + ' 宛に確認メールをお送りします。\n2営業日以内にご連絡します。');
    document.getElementById('contactEmail').value = '';
  }
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

document.querySelectorAll('.work-card, .service-item, .testi-card, .process-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.35s, background 0.3s';
  observer.observe(el);
});
