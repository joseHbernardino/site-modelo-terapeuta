// ===========================================
// SCROLL HEADER
// ===========================================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===========================================
// MENU MOBILE TOGGLE
// ===========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle do menu mobile
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

// ===========================================
// NAVEGAÇÃO SUAVE COM SCROLL
// ===========================================
navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Pega o id da seção
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    
    if (target) {
      // Calcula a posição com offset para o header fixo
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      
      // Scroll suave
      window.scrollTo({ 
        top, 
        behavior: 'smooth' 
      });
      
      // Fecha o menu mobile após clicar
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
    }
  });
});

// ===========================================
// FECHA MENU AO CLICAR FORA
// ===========================================
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
  }
});

// ===========================================
// ANIMAÇÃO DE ENTRADA DOS CARDS AO SCROLL
// ===========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observa todos os cards para animação
document.querySelectorAll('.card, .stat-card, .step').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// ===========================================
// INDICADOR DE SEÇÃO ATIVA NO MENU
// ===========================================
const sections = document.querySelectorAll('section');

const highlightNavOnScroll = () => {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove ativo de todos
      navItems.forEach(item => {
        item.classList.remove('active');
      });
      
      // Adiciona ativo ao item correspondente
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
};

window.addEventListener('scroll', highlightNavOnScroll);

// ===========================================
// SMOOTH SCROLL PARA TODOS OS LINKS #
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignora links vazios
    if (href === '#' || !href) return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({ 
        top, 
        behavior: 'smooth' 
      });
    }
  });
});

// ===========================================
// BOTÃO VOLTAR AO TOPO (OPCIONAL)
// ===========================================
const createBackToTop = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Voltar ao topo');
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4a574, #b8895f);
    color: white;
    border: none;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(212, 165, 116, 0.4);
  `;
  
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  document.body.appendChild(button);
  
  // Mostra/esconde o botão baseado no scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    } else {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }
  });
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-6px) scale(1.1)';
    button.style.boxShadow = '0 8px 30px rgba(212, 165, 116, 0.6)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0) scale(1)';
    button.style.boxShadow = '0 4px 20px rgba(212, 165, 116, 0.4)';
  });
};

// Inicializa o botão voltar ao topo
createBackToTop();

// ===========================================
// LOG DE CARREGAMENTO
// ===========================================
console.log('🌿 Site de Terapia Holística carregado com sucesso!');
console.log('✨ Desenvolvido com HTML5, CSS3 e JavaScript');
