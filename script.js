const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    menuButton.focus();
  }
});
document.querySelector('.copy-email')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(button.dataset.email);
    status.textContent = '이메일 주소를 복사했습니다.';
  } catch {
    status.textContent = '복사할 이메일: ' + button.dataset.email;
  }
});
const tocLinks = [...document.querySelectorAll('.toc a')];
const headings = tocLinks.map(link => document.querySelector(link.getAttribute('href')));
if (headings.length) {
  let scheduled = false;
  const update = () => {
    scheduled = false;
    let index = 0;
    headings.forEach((heading, i) => { if (heading.getBoundingClientRect().top <= 160) index = i; });
    tocLinks.forEach((link, i) => {
      link.classList.toggle('active', i === index);
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

