const EMAIL_ADDRESS = 'theallknowing539@gmail.com';
const DISCORD_HANDLE = 'said_innovates';


const projects = [
  [
    '01',
    'Short Form Motion Design Edit',
    'Short / Motion',
    'h9Z2wEj9-z4',
    ['short', 'motion'],
  ],
  [
    '02',
    'Common Luke Style Sample Edit',
    'Essay / Sample',
    '5d361SYkAkA',
    ['short', 'motion'],
  ],
  [
    '03',
    'Talking Head Motion Design Edit',
    'Short / Motion',
    'nG4keLireAA',
    ['short', 'motion'],
  ],
  [
    '04',
    'Q4 German Supply Chains',
    'Motion Graphics',
    '4gPpYTnM2eY',
    ['motion'],
  ],
  [
    '05',
    'Advanced Motion & Retention',
    'Motion Graphics',
    '_L0IlHTC3Sg',
    ['short', 'motion'],
  ],
  [
    '06',
    'Retention-Focused Hook Edit',
    'Motion Graphics',
    'VGKbqu9bNoA',
    ['short', 'motion'],
  ],
  [
    '07',
    'Dynamic Visual Storytelling',
    'Short Form',
    'EacLZi61J9g',
    ['short'],
  ],
  [
    '08',
    'High-Retention Pacing Showcase',
    'Short Form',
    'KsIyhva5VGw',
    ['short'],
  ],
  [
    '09',
    'Motion Graphics Reel',
    'Motion Graphics',
    'ig-BwAgNEaA',
    ['motion'],
  ],
  [
    '10',
    'Gaming Motion & Pacing',
    'Gaming / Short',
    'jssnc8uF7VQ',
    ['short', 'motion', 'gaming'],
  ],
];

const descriptions = [
  'A re-edit of a creator introduction built around kinetic type, visual punch-ins, and retention-first pacing.',
  'A sample concept cut exploring high-retention video essay language.',
  'Dynamic zooms, kinetic typography, and clean pacing tuned for a social-first talking head sequence.',
  'Data visualization and corporate storytelling mapping logistics, transit flows, and business infrastructure.',
  'A compact social sequence pairing precise transitions with kinetic titles and a fast editorial rhythm.',
  'A social cut designed around its first three seconds, seamless transitions, and a clear opening hook.',
  'Story-first social editing with sound-led transitions, visual punctuation, and deliberate pacing.',
  'An algorithm-aware short with sound design, sound effects, and an intentionally tight color grade.',
  'A focused reel of arrows, text animations, visual effects, and editorial devices made to clarify ideas.',
  'High-energy gaming editing with sync-to-beat pacing, custom text layouts, and rapid retention hooks.',
];

const filters = [
  ['all', 'All work'],
  ['motion', 'Motion graphics'],
  ['short', 'Short form'],
  ['long', 'Long form'],
  ['gaming', 'Gaming'],
];

const filterBar = document.querySelector('.filters');
const projectGrid = document.querySelector('#projects');

let active = 'all';

function renderFilters() {
  filterBar.innerHTML = filters
    .map(([key, label]) => {
      const count =
        key === 'all'
          ? projects.length
          : projects.filter((project) => project[4].includes(key)).length;

      return `
        <button
          class="${active === key ? 'active' : ''}"
          data-filter="${key}"
          type="button"
        >
          ${label} <span>${count}</span>
        </button>
      `;
    })
    .join('');

  filterBar.querySelectorAll('button').forEach((button) => {
    button.onclick = () => {
      active = button.dataset.filter;
      renderFilters();
      renderProjects();
    };
  });
}

function renderProjects() {
  const list = projects.filter(
    (project) => active === 'all' || project[4].includes(active),
  );

  projectGrid.innerHTML = list.length
    ? list
        .map((project) => {
          const projectIndex = projects.indexOf(project);

          return `
            <article class="project">
              <div class="thumb">
                <img
                  src="https://img.youtube.com/vi/${project[3]}/maxresdefault.jpg"
                  alt="${project[1]} thumbnail"
                />

                <button
                  type="button"
                  data-video="${project[3]}"
                  aria-label="Play ${project[1]}"
                >
                  ▶
                </button>
              </div>

              <div class="project-info">
                <h3>${project[1]}</h3>
                <p>${descriptions[projectIndex]}</p>

                <div class="project-meta">
                  <span>${project[2]}</span>
                  <span>ORIGINAL CUT</span>
                </div>
              </div>
            </article>
          `;
        })
        .join('')
    : '<div class="empty-state">No cuts match this filter right now.</div>';

  projectGrid.querySelectorAll('[data-video]').forEach((button) => {
    button.onclick = () => openVideo(button.dataset.video);
  });
}

// Modal handling
function openVideo(id) {
  const modal = document.querySelector('#modal');
  const iframe = modal.querySelector('iframe');
  
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

document.querySelector('#close').onclick = () => {
  const modal = document.querySelector('#modal');
  const iframe = modal.querySelector('iframe');
  
  iframe.src = '';
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
};

// Navigation
document.querySelectorAll('[data-go]').forEach((button) => {
  button.onclick = () => {
    const targetId = button.getAttribute('data-go');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    const rail = document.querySelector('.rail');
    if (rail.classList.contains('open')) {
      rail.classList.remove('open');
      document.querySelector('#menu').textContent = 'Menu';
    }
  };
});

// Mobile menu toggle
const menuButton = document.querySelector('#menu');
menuButton.onclick = () => {
  const rail = document.querySelector('.rail');
  const isOpen = rail.classList.contains('open');
  
  if (isOpen) {
    rail.classList.remove('open');
    menuButton.textContent = 'Menu';
  } else {
    rail.classList.add('open');
    menuButton.textContent = 'Close';
  }
};

// Theme toggle
const themeButtons = document.querySelectorAll('#theme, #theme-mobile');
themeButtons.forEach((btn) => {
  btn.onclick = () => {
    const isLight = document.documentElement.classList.toggle('light');
    themeButtons.forEach((b) => b.textContent = isLight ? 'Night view' : 'Daylight view');
  };
});

// Clipboard copy handling
function setupCopyButton(buttonId, textToCopy) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  
  const statusSpan = button.querySelector('span:last-child');
  
  button.onclick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      button.setAttribute('data-copied', 'true');
      statusSpan.textContent = 'Copied!';
      
      setTimeout(() => {
        button.removeAttribute('data-copied');
        statusSpan.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
}

setupCopyButton('email-copy', EMAIL_ADDRESS);
setupCopyButton('discord', DISCORD_HANDLE);

// Initialize app
renderFilters();
renderProjects();
// Lightweight Scroll Reveal using Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { // Fixed capital "I"
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
  observer.observe(element);
});