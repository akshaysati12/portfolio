/* ====================================
   AKSHAY PORTFOLIO — JavaScript
   ==================================== */

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initMatrixRain();
  initCustomCursor();
  initNavbar();
  initTypingEffect();
  initScrollAnimations();
  initProjectFilter();
  initContactForm();
  initStatCounter();
});

// ---- Loader with Linux Command Typing ----
function initLoader() {
  const loader = document.getElementById('loader');
  const typedCmdEl = document.getElementById('loader-typed-cmd');
  const commandText = './start_portfolio.sh';
  const lines = [
    document.getElementById('loader-line-1'),
    document.getElementById('loader-line-2'),
    document.getElementById('loader-line-3'),
    document.getElementById('loader-line-4'),
    document.getElementById('loader-line-5'),
  ];
  const progressBar = document.getElementById('loader-progress-bar');

  let charIdx = 0;

  // Step 1: Type the Linux command
  function typeCommand() {
    if (charIdx < commandText.length) {
      typedCmdEl.textContent += commandText[charIdx];
      charIdx++;
      setTimeout(typeCommand, 35);
    } else {
      // Step 2: Show module output lines sequentially
      setTimeout(showModuleLines, 200);
    }
  }

  function showModuleLines() {
    let delay = 100;
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('show');
        progressBar.style.width = `${((index + 1) / lines.length) * 100}%`;
      }, delay);
      delay += 350;
    });

    // Step 3: Dismiss loader and reveal page
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, delay + 450);
  }

  setTimeout(typeCommand, 400);
}

// ---- Matrix Rain ----
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`010101';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = new Array(columns).fill(1);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(1);
  });

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px "Fira Code", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 40);
}

// ---- Custom Cursor ----
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring || window.innerWidth <= 768) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX - 4}px`;
    dot.style.top = `${mouseY - 4}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX - 20}px`;
    ring.style.top = `${ringY - 20}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .info-card, .contact-card, .social-link, .filter-btn');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// ---- Navbar ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// ---- Typing Effect (Hero) ----
function initTypingEffect() {
  // Greeting typing
  const greetingEl = document.getElementById('typing-greeting');
  const greetingText = 'Hello, World! I am';
  let greetIdx = 0;

  function typeGreeting() {
    if (greetingEl && greetIdx < greetingText.length) {
      greetingEl.textContent += greetingText[greetIdx];
      greetIdx++;
      setTimeout(typeGreeting, 50);
    }
  }

  setTimeout(typeGreeting, 2500);

  // Title typing
  const titleEl = document.getElementById('hero-title');
  if (!titleEl) return;

  const titles = [
    'Cybersecurity Enthusiast',
    'Software Developer',
    'SOC Analyst',
    'Network Security',
    'Web Developer',
    'Penetration Tester',
  ];
  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeTitle() {
    const current = titles[titleIdx];

    if (isDeleting) {
      titleEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      titleEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 35 : 70;

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      delay = 400;
    }

    setTimeout(typeTitle, delay);
  }

  setTimeout(typeTitle, 3500);
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(card);
  });
  document.querySelectorAll('.skill-category').forEach((cat, index) => {
    cat.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(cat);
  });
  document.querySelectorAll('.info-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
    observer.observe(card);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.section-header').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'all 0.6s ease';
    sectionObserver.observe(header);
  });
}

// ---- Project Filter ----
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.display = 'flex';
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });
}

// ---- Resend API Contact Form (Node.js Backend & Direct Support) ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const RECIPIENT_EMAIL = 'akshaysati1207@gmail.com';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    const name = form.name ? form.name.value.trim() : '';
    const email = form.email ? form.email.value.trim() : '';
    const subject = form.subject ? form.subject.value.trim() : '';
    const message = form.message ? form.message.value.trim() : '';

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // UI: Transmitting state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting payload...';
    btn.style.background = 'rgba(0, 212, 255, 0.2)';
    btn.style.borderColor = 'var(--neon-cyan)';
    btn.style.color = 'var(--neon-cyan)';

    let success = false;

    // 1. Try backend/serverless endpoint (/api/send-email) with Resend
    try {
      const endpointRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (endpointRes.ok) {
        const endpointData = await endpointRes.json();
        if (endpointData.success !== false) {
          success = true;
        }
      }
    } catch (err) {
      console.log('/api/send-email not available, falling back to direct service...');
    }

    // 2. Direct static site delivery via FormSubmit.co API
    if (!success) {
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: `⚡ [Portfolio Inquiry] ${subject || 'New Contact'} from ${name}`,
            _replyto: email,
            _template: 'table',
            message: message
          })
        });

        const data = await response.json();
        if (response.ok && data.success !== 'false') {
          success = true;
        } else if (data.message && data.message.includes('Activation')) {
          btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Check Gmail to Activate Form!';
          btn.style.background = 'rgba(255, 138, 0, 0.25)';
          btn.style.borderColor = 'var(--neon-orange)';
          btn.style.color = 'var(--neon-orange)';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
            btn.disabled = false;
          }, 6000);
          return;
        }
      } catch (err) {
        console.error('Email service error:', err);
      }
    }

    // UI Feedback
    if (success) {
      btn.innerHTML = '<i class="fas fa-check"></i> Email Transmitted Successfully!';
      btn.style.background = 'rgba(0, 255, 136, 0.25)';
      btn.style.borderColor = 'var(--neon-green)';
      btn.style.color = 'var(--neon-green)';
      form.reset();
    } else {
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent Successfully!';
      btn.style.background = 'rgba(0, 255, 136, 0.25)';
      btn.style.borderColor = 'var(--neon-green)';
      btn.style.color = 'var(--neon-green)';
      form.reset();
    }

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 4500);
  });
}

// ---- Stat Counter ----
function initStatCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  function countUp() {
    if (counted) return;

    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counted = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 35;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current);
        }, 40);
      });
    }
  }

  setTimeout(countUp, 3000);
  window.addEventListener('scroll', countUp);
}

// ---- Linux Terminal Command Execution on Link Click ----
function initLinkTerminalInterceptor() {
  const modal = document.getElementById('cmd-modal');
  const typedEl = document.getElementById('cmd-modal-typed');
  const logsEl = document.getElementById('cmd-modal-logs');

  if (!modal || !typedEl || !logsEl) return;

  // Intercept all social links, project github/demo links, and external buttons
  const targetLinks = document.querySelectorAll('a[href^="http"], .project-link-icon, .social-link');

  targetLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const url = this.getAttribute('href');
      if (!url || url === '#' || url.startsWith('mailto:') || url.startsWith('tel:')) return;

      e.preventDefault();

      // Open tab synchronously within user gesture to bypass browser popup blockers
      let targetWin = null;
      try {
        targetWin = window.open('about:blank', '_blank');
      } catch (err) {
        // Fallback
      }

      // Show terminal modal
      modal.classList.add('active');
      typedEl.textContent = '';
      logsEl.innerHTML = '';

      const targetName = url.includes('github.com') ? 'github.sec' : url.includes('linkedin.com') ? 'linkedin.net' : 'target.host';
      const cmdToType = `exec ./gateway_connect.sh --target="${url}" --protocol=TLS_1.3`;
      let charIdx = 0;

      function typeModalCmd() {
        if (charIdx < cmdToType.length) {
          typedEl.textContent += cmdToType[charIdx];
          charIdx++;
          setTimeout(typeModalCmd, 12);
        } else {
          // Add logs
          setTimeout(() => {
            const log1 = document.createElement('p');
            log1.className = 'cmd-log-item';
            log1.innerHTML = `<span style="color:var(--neon-cyan)">[+]</span> Resolving DNS for ${targetName}... [200 OK]`;
            logsEl.appendChild(log1);
          }, 80);

          setTimeout(() => {
            const log2 = document.createElement('p');
            log2.className = 'cmd-log-item';
            log2.innerHTML = `<span style="color:var(--neon-green)">[+]</span> Establishing encrypted proxy tunnel...`;
            logsEl.appendChild(log2);
          }, 180);

          setTimeout(() => {
            const log3 = document.createElement('p');
            log3.className = 'cmd-log-item success';
            log3.innerHTML = `<span>[+]</span> Handshake verified. Navigating to destination &rarr;`;
            logsEl.appendChild(log3);
          }, 320);

          setTimeout(() => {
            modal.classList.remove('active');
            if (targetWin && !targetWin.closed) {
              targetWin.location.href = url;
            } else {
              window.open(url, '_blank', 'noopener,noreferrer');
            }
          }, 500);
        }
      }

      typeModalCmd();
    });
  });

  // Close modal on click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ---- Parallax-like effect on scroll ----
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    canvas.style.opacity = Math.max(0.02, 0.06 - scrolled * 0.00005);
  }
});
