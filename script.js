const sections = [...document.querySelectorAll('.page-section')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const navMenu = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');

function switchSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target || !target.classList.contains('page-section')) return;

  sections.forEach(section => section.classList.toggle('active', section.id === sectionId));
  navLinks.forEach(link => {
    const active = link.dataset.section === sectionId;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  navMenu?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.setAttribute('aria-label', 'Open navigation');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    switchSection(link.dataset.section);
  });
});

document.querySelectorAll('[data-section]:not(.nav-link)').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    switchSection(link.dataset.section);
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '☰' : '☰';
});

document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const reason = document.getElementById('reason').value;
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`${reason} — Message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message || '(No additional message)'}`
  );
  const status = document.getElementById('statusMessage');
  status.style.display = 'block';
  status.textContent = 'Your email app should open with the message prepared. Please review it and press Send there.';
  window.location.href = `mailto:krishnakushwah7970@gmail.com?subject=${subject}&body=${body}`;
});
