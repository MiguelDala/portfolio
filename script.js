// Theme toggle functionality + persistence
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}
// Set correct icon on load
themeToggle.innerHTML = body.getAttribute('data-theme') === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
    const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    themeToggle.innerHTML = nextTheme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// Language switcher functionality
const langButtons = document.querySelectorAll('.lang-btn');
const translations = {
    pt: {
        home: 'Home',
        about: 'Sobre',
        skills: 'Habilidades',
        projects: 'Projetos',
        contact: 'Contato',
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        send: 'Enviar Mensagem'
    },
    en: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message'
    }
};

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        document.documentElement.lang = lang;
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update text content
        Object.entries(translations[lang]).forEach(([key, value]) => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = value;
            });
        });
    });
});

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate project cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    observer.observe(card);
});

// Lazy-load all images except the profile image (already visible)
document.querySelectorAll('img').forEach(img => {
    const isHeroProfile = img.closest('.profile-image');
    if (!isHeroProfile) {
        img.setAttribute('loading', 'lazy');
    }
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Animação fade-in para seções ao rolar a página
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Alternar modo dark/light ao clicar na foto de perfil
const profileImg = document.querySelector('.profile-image img');
if (profileImg) {
    profileImg.addEventListener('click', () => {
        const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        themeToggle.innerHTML = nextTheme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    });
}

// Animação para os novos cards da timeline
const animatedCards = document.querySelectorAll('.animated-card');
const animatedCardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

animatedCards.forEach(card => {
    animatedCardObserver.observe(card);
});

// Animate skill bars when they enter the viewport
const skillBars = document.querySelectorAll('.bar-fill');
const originalWidths = new WeakMap();

// Store original width and reset to 0 initially for animation
skillBars.forEach(bar => {
    const computedWidth = getComputedStyle(bar).width;
    originalWidths.set(bar, computedWidth);
    bar.style.width = '0px';
});

const skillsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = originalWidths.get(bar);
            bar.style.width = width;
            obs.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillsObserver.observe(bar));

// Contact form: send via mailto with prefilled subject/body
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const [nameInput, emailInput, messageInput] = contactForm.querySelectorAll('input, textarea');
        const name = encodeURIComponent(nameInput.value.trim());
        const email = encodeURIComponent(emailInput.value.trim());
        const message = encodeURIComponent(messageInput.value.trim());

        const subject = `Contato via portfólio - ${name || 'Sem nome'}`;
        const body = `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`;
        const recipient = 'miguel@example.com'; // ajuste para o seu email real
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    });
}

// Footer year auto-update (keeps 2024 style but updates year dynamically)
const footerText = document.querySelector('footer p');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = footerText.innerHTML.replace(/\b20\d{2}\b|\b19\d{2}\b/, String(currentYear));
}