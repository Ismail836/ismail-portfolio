const themeToggle = document.getElementById('themeToggle');
const pageLoader = document.getElementById('pageLoader');
const projectGrid = document.getElementById('projectGrid');
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
const loaderValue = document.getElementById('loaderValue');
const heroCard = document.getElementById('heroCard');
const themeKey = 'portfolioTheme';

const themes = {
  dark: 'theme-dark',
  light: 'theme-light',
};

function setTheme(theme) {
  document.body.classList.remove(themes.dark, themes.light);
  document.body.classList.add(themes[theme]);
  themeToggle.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
  localStorage.setItem(themeKey, theme);
}

function loadTheme() {
  const saved = localStorage.getItem(themeKey);
  setTheme(saved === 'light' ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  const active = document.body.classList.contains(themes.dark) ? 'dark' : 'light';
  setTheme(active === 'dark' ? 'light' : 'dark');
});

function fetchProjects() {
  fetch('/api/projects')
    .then((response) => response.json())
    .then((projects) => {
      projectGrid.innerHTML = projects
        .map(
          (project) => `
            <article class="glass-card project-card">
              <div>
                <p class="project-label">${project.category}</p>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
              </div>
              <div class="project-tags">
                ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
              </div>
              <div class="project-footer">
                <a href="${project.link}" class="project-link" target="_blank" rel="noreferrer">View case</a>
                <button class="button button-secondary project-action" data-slug="${project.slug}">Track</button>
              </div>
            </article>
          `
        )
        .join('');

      document.querySelectorAll('.project-action').forEach((button) => {
        button.addEventListener('click', () => {
          const slug = button.dataset.slug;
          fetch('/api/project-click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug }),
          });
        });
      });
    })
    .catch(() => {
      projectGrid.innerHTML = '<p class="form-status">Unable to load projects right now.</p>';
    });
}

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  contactStatus.textContent = '';

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Could not send message');
    }

    contactStatus.textContent = 'Message sent — I will reply soon.';
    contactStatus.style.color = 'var(--accent)';
    contactForm.reset();
  } catch (error) {
    contactStatus.textContent = error.message;
    contactStatus.style.color = '#ff6b6b';
  }
});

function hideLoader() {
  if (!pageLoader) {
    return;
  }
  if (window.gsap && typeof gsap.to === 'function') {
    gsap.to(pageLoader, {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      onComplete: () => {
        pageLoader.style.display = 'none';
        pageLoader.remove();
      },
    });
  } else {
    pageLoader.style.opacity = '0';
    pageLoader.style.pointerEvents = 'none';
    pageLoader.style.display = 'none';
    pageLoader.remove();
  }
}

function updateLoader() {
  let value = 0;
  const interval = setInterval(() => {
    value += Math.floor(Math.random() * 7) + 4;
    if (value >= 100) {
      value = 100;
      loaderValue.textContent = `${value}%`;
      clearInterval(interval);
      hideLoader();
      if (window.gsap && typeof gsap.from === 'function') {
        gsap.from('.page-header, .hero-title, .hero-card, .section-header, .project-card, .contact-grid', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        });
      }
      return;
    }
    loaderValue.textContent = `${value}%`;
  }, 120);
}

function attachHeroMotion() {
  document.addEventListener('mousemove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

    heroCard.style.transform = `translate3d(${x * 18}px, ${y * 18}px, 0) rotateX(${y * 6}deg) rotateY(${x * 6}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
  });
}

function init() {
  loadTheme();
  fetchProjects();
  updateLoader();
  attachHeroMotion();
}

init();
