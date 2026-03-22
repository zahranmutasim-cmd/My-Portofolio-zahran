import React, { useEffect, useState, useRef } from 'react';
function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [modalImage, setModalImage] = useState(null);
  
  const typingElementRef = useRef(null);

  useEffect(() => {
    // Theme setup from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.documentElement.classList.add('light-mode');
    }

    // Particles setup
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && particlesContainer.childElementCount === 0) {
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        let size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
      }
    }

    // Scroll Navbar Setup
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.background = isLightMode ? 'rgba(248, 250, 252, 0.95)' : 'rgba(15, 23, 42, 0.9)';
          navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
          navbar.style.background = isLightMode ? 'rgba(248, 250, 252, 0.85)' : 'rgba(15, 23, 42, 0.7)';
          navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        }
      }

      // Intersection Setup for Active Link Highlight
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    // Fade in effect
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    hiddenElements.forEach(el => observer.observe(el));

    // 3D Effect setup
    const cards = document.querySelectorAll('.project-card, .hero-image-wrapper');
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = (card) => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    const mouseMoveListeners = [];
    cards.forEach(card => {
      const moveListener = (e) => handleMouseMove(e, card);
      const leaveListener = () => handleMouseLeave(card);
      card.addEventListener('mousemove', moveListener);
      card.addEventListener('mouseleave', leaveListener);
      mouseMoveListeners.push({card, moveListener, leaveListener});
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mouseMoveListeners.forEach(({card, moveListener, leaveListener}) => {
        card.removeEventListener('mousemove', moveListener);
        card.removeEventListener('mouseleave', leaveListener);
      });
    };
  }, [isLightMode]);

  // Typing Effect (run once safely)
  useEffect(() => {
    const typingTextMenu = ["Software Engineer", "Frontend Developer", "UI/UX Designer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const typeEffect = () => {
      if (!typingElementRef.current) return;
      const currentWord = typingTextMenu[textIndex];

      if (isDeleting) {
        typingElementRef.current.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElementRef.current.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 100 : 150;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTextMenu.length;
        typeSpeed = 800;
      }

      timeoutId = setTimeout(typeEffect, typeSpeed);
    };

    timeoutId = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('light-mode');
    setIsLightMode(!isLightMode);
    localStorage.setItem('portfolio-theme', !isLightMode ? 'light' : 'dark');
  };

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setIsNavActive(false);
    setActiveSection(sectionId.substring(1));
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  const viewExperience = () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.add('slide-left-fade');
    setTimeout(() => {
      const expSection = document.getElementById('experience');
      if (expSection) {
        window.scrollTo({
          top: expSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
      setTimeout(() => {
        if (heroContent) heroContent.classList.remove('slide-left-fade');
      }, 800);
    }, 300);
  };

  return (
    <>
      <div className="particles" id="particles"></div>

      <nav id="navbar">
        <div className="nav-container">
          <a href="#home" className="logo">Zahran<span> Mu'tashim</span></a>
          <ul className={`nav-links ${isNavActive ? 'nav-active' : ''}`}>
            {['home', 'about', 'experience', 'projects', 'contact'].map(link => (
              <li key={link}>
                <a 
                  href={`#${link}`} 
                  className={activeSection === link ? 'active' : ''}
                  onClick={(e) => handleNavClick(`#${link}`, e)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div className="theme-toggle" id="theme-toggle" onClick={toggleTheme}>
            <i className={`fas ${isLightMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </div>
          <div className="hamburger" onClick={() => setIsNavActive(!isNavActive)}>
            <i className={isNavActive ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="home-section">
          <div className="animated-bg"></div>
          <div className="hero-content">
            <div className="hero-image-wrapper">
              <img src="Profile PIcture.png" alt="Muhammad Zahran Mu'tashim" className="hero-photo" />
            </div>
            <div className="hero-text">
              <h1 className="dev-greeting">Hello I'Am</h1>
              <h1 className="dev-name">Muhammad Zahran Mu'tashim</h1>
              <h2 className="dev-role">I'am a <span className="typing-text" ref={typingElementRef}></span></h2>
              <button className="btn primary-btn" id="view-experience-btn" onClick={viewExperience}>View Experience</button>
            </div>
          </div>
        </section>

        <section id="about" className="about-section hidden">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <p className="about-text">
                Nama saya Muhammad Zahran Mu'tashim. Saya berasal dari Palembang, Sumatera Selatan. Saat ini saya adalah seorang mahasiswa di Politeknik Negeri Sriwijaya yang sangat tertarik dan bersemangat dalam bidang teknologi informasi, terutama berfokus pada pengembangan website, pengembangan sistem, dan pembuatan aplikasi modern yang fungsional.
                saya juga sering mengikuti pelatihan tentang websit dan AI.
              </p>
              <div className="tech-icons">
                <i className="fab fa-html5" title="HTML5" style={{ color: '#E34F26' }}></i>
                <i className="fab fa-css3-alt" title="CSS3" style={{ color: '#1572B6' }}></i>
                <i className="fab fa-js" title="JavaScript" style={{ color: '#F7DF1E' }}></i>
                <i className="fab fa-react" title="React" style={{ color: '#61DAFB' }}></i>
                <i className="fab fa-node-js" title="Node.js" style={{ color: '#339933' }}></i>
                <i className="fab fa-python" title="Python" style={{ color: '#3776AB' }}></i>
                <i className="fab fa-git-alt" title="Git" style={{ color: '#F05032' }}></i>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section hidden">
          <div className="container">
            <h2 className="section-title">Experience & Certifications</h2>
            <div className="experience-grid">
              <div className="exp-card">
                <div className="exp-img-wrapper" onClick={() => setModalImage('Sertif pertama .jpg')}>
                  <img src="Sertif pertama .jpg" alt="Certification 1" />
                  <div className="img-overlay"><i className="fas fa-expand"></i></div>
                </div>
                <div className="exp-content">
                  <h3 className="exp-title">Learning series GDG Sriwijaya state politechinc</h3>
                  <p className="exp-desc">Pelatihan Mengenai pengembangan dan Pembuatan sistem Aplikasi menggunakan Kotlin dan Jetpack Compose.</p>
                  <span className="exp-year">2025</span>
                </div>
              </div>
              <div className="exp-card">
                <div className="exp-img-wrapper" onClick={() => setModalImage('Sertif ke dua _page-0001.jpg')}>
                  <img src="Sertif ke dua _page-0001.jpg" alt="Certification 2" />
                  <div className="img-overlay"><i className="fas fa-expand"></i></div>
                </div>
                <div className="exp-content">
                  <h3 className="exp-title">Intro to Data Analytics</h3>
                  <p className="exp-desc">Pelatihan mengenai Data Analytics yang diselenggarakan oleh RevoU selama 7 hari, berfokus pada pembelajaran menganalisis dan penggunaan Excel.</p>
                  <span className="exp-year">2025</span>
                </div>
              </div>
              <div className="exp-card">
                <div className="exp-img-wrapper" onClick={() => setModalImage('Seritif ke tiga_page-0001.jpg')}>
                  <img src="Seritif ke tiga_page-0001.jpg" alt="Certification 3" />
                  <div className="img-overlay"><i className="fas fa-expand"></i></div>
                </div>
                <div className="exp-content">
                  <h3 className="exp-title">Coding Camp</h3>
                  <p className="exp-desc">Pelatihan yang diselenggarakan oleh RevoU yang berfokus pada pembuatan dan pengembangan website dasar HTML, CSS, dan JavaScript.</p>
                  <span className="exp-year">2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section hidden">
          <div className="container">
            <h2 className="section-title">My Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-img">
                  <img src="Web Pendataan staf.png" alt="Sistem Pendataan Staf" />
                </div>
                <div className="project-info">
                  <h3 className="project-title">Sistem Pendataan Staf</h3>
                  <p className="project-desc">Aplikasi web untuk mendata dan mengelola informasi staf perusahaan secara efisien.</p>
                  <div className="tech-tags">
                    <span className="tag-html"><i className="fab fa-html5"></i> HTML</span>
                    <span className="tag-css"><i className="fab fa-css3-alt"></i> CSS</span>
                    <span className="tag-js"><i className="fab fa-js"></i> JavaScript</span>
                  </div>
                </div>
              </div>
              <div className="project-card">
                <div className="project-img">
                  <img src="Web kedai Kopi.png" alt="Website Kedai Kopi" />
                </div>
                <div className="project-info">
                  <h3 className="project-title">Website Kedai Kopi</h3>
                  <p className="project-desc">Landing page interaktif untuk sebuah kedai kopi, menampilkan menu dan galeri lokasi.</p>
                  <div className="tech-tags">
                    <span className="tag-html"><i className="fab fa-html5"></i> HTML</span>
                    <span className="tag-css"><i className="fab fa-css3-alt"></i> CSS</span>
                    <span className="tag-js"><i className="fab fa-js"></i> JavaScript</span>
                  </div>
                </div>
              </div>
              <div className="project-card">
                <div className="project-img">
                  <img src="Web todo list sederahana.png" alt="Todo List App" />
                </div>
                <div className="project-info">
                  <h3 className="project-title">Aplikasi Todo List Sederhana</h3>
                  <p className="project-desc">Aplikasi manajemen tugas harian yang simpel dan mudah digunakan berbasis website.</p>
                  <div className="tech-tags">
                    <span className="tag-html"><i className="fab fa-html5"></i> HTML</span>
                    <span className="tag-css"><i className="fab fa-css3-alt"></i> CSS</span>
                    <span className="tag-js"><i className="fab fa-js"></i> JavaScript</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section hidden">
          <div className="container">
            <h2 className="section-title">Contact Me</h2>
            <div className="contact-grid">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=zahranmutasim@gmail.com" target="_blank" rel="noreferrer" className="compact-contact">
                <i className="fas fa-envelope"></i>
                <span className="compact-text">Email</span>
              </a>
              <a href="https://wa.me/qr/Y7RSPH5ACCZRA1" className="compact-contact">
                <i className="fab fa-whatsapp"></i>
                <span className="compact-text">WhatsApp</span>
              </a>
              <a href="https://github.com/zahranmutasim-cmd" className="compact-contact">
                <i className="fab fa-github"></i>
                <span className="compact-text">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/muhammad-zahran-mu-tashim-aa64403b3" className="compact-contact">
                <i className="fab fa-linkedin-in"></i>
                <span className="compact-text">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/zahranmutasim?igsh=MWhqYnU5YnZreDZzZQ==" className="compact-contact">
                <i className="fab fa-instagram"></i>
                <span className="compact-text">Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Image Modal Preview */}
      <div 
        className="modal" 
        id="image-modal" 
        style={{ display: modalImage ? 'block' : 'none' }}
        onClick={(e) => {
          if (e.target.className === 'modal') {
              setModalImage(null)
          }
        }}
      >
        <span className="modal-close" onClick={() => setModalImage(null)}>&times;</span>
        {modalImage && <img className="modal-content" id="modal-img" src={modalImage} alt="Modal Content" />}
      </div>
    </>
  );
}

export default App;
