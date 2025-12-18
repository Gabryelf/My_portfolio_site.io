// ===== ПРЕЛОАДЕР =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    
    // Симуляция загрузки
    let progress = 0;
    const progressBar = document.querySelector('.loading-bar .progress');
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Скрываем прелоадер
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initPage();
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
});

// ===== ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ =====
function initPage() {
    initNavigation();
    initHeroSection();
    initProjects();
    initSkills();
    initContactForm();
    initAnimations();
    initTheme();
    initModal();
    initSmoothScroll();
    
    // Запускаем эффекты
    createParticles();
    startTypingAnimation();
    animateStats();
}

// ===== НАВИГАЦИЯ =====
function initNavigation() {
    const nav = document.querySelector('.navbar');
    const navToggle = document.querySelector('#navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Эффект скролла
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Подсветка активного раздела
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Переключение мобильного меню
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== ГЕРОЙ СЕКЦИЯ =====
function initHeroSection() {
    const heroBg = document.getElementById('heroBackground');
    const backgrounds = [
        'background/back1.jpg',
        'background/back2.jpg',
        'background/back3.jpg',
        'background/back4.jpg',
        'background/back5.jpg',
        'background/back6.jpg',
        'background/back7.jpg',
        'background/back8.jpg',
        'background/back9.jpg'
    ];
    
    // Случайный фон
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    heroBg.style.backgroundImage = `url(${randomBg})`;
    
    // Смена фона каждые 10 секунд
    let currentBgIndex = backgrounds.indexOf(randomBg);
    setInterval(() => {
        currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
        heroBg.style.opacity = '0.3';
        setTimeout(() => {
            heroBg.style.backgroundImage = `url(${backgrounds[currentBgIndex]})`;
            heroBg.style.opacity = '0.3';
        }, 500);
    }, 10000);
}

// ===== ЭФФЕКТ ЧАСТИЦ =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные параметры
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Стили
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--accent-primary);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatParticle ${duration}s linear ${delay}s infinite;
            box-shadow: 0 0 10px var(--accent-primary);
        `;
        
        container.appendChild(particle);
    }
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0.1;
            }
            25% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0.4;
            }
            50% {
                transform: translateY(-200px) translateX(0);
                opacity: 0.1;
            }
            75% {
                transform: translateY(-100px) translateX(-100px);
                opacity: 0.4;
            }
            100% {
                transform: translateY(0) translateX(0);
                opacity: 0.1;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== ТЕКСТ С ПЕЧАТЬЮ =====
function startTypingAnimation() {
    const texts = [
        "которые вдохновляют",
        "полные эмоций",
        "со смыслом",
        "в которые хочется играть",
        "на Unity & C#"
    ];
    
    const typingElement = document.getElementById('typingText');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(type, 1000);
}

// ===== АНИМАЦИЯ СТАТИСТИКИ =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('K') ? 'K+' : '');
        }, 20);
    });
}

// ===== ПРОЕКТЫ =====
function initProjects() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const playButtons = document.querySelectorAll('.play-btn');
    const detailButtons = document.querySelectorAll('.btn-details');
    
    // Фильтрация проектов
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Фильтруем проекты
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Управление видео
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const video = button.closest('.project-media').querySelector('video');
            
            if (video.paused) {
                video.play();
                button.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                button.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    });
    
    // Пауза видео при скролле
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.project-media video').forEach(video => {
            const rect = video.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                video.pause();
                const playBtn = video.parentElement.querySelector('.play-btn');
                if (playBtn) {
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });
    });
}

// ===== НАВЫКИ =====
function initSkills() {
    const skillBars = document.querySelectorAll('.tech-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.skills-section'));
}

// ===== ФОРМА КОНТАКТОВ =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Симуляция отправки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        // Имитация задержки сети
        setTimeout(() => {
            // Здесь будет реальная отправка на сервер
            console.log('Form submitted:', data);
            
            // Показываем успешное сообщение
            alert('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.');
            
            // Сбрасываем форму
            form.reset();
            
            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами с анимацией
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// ===== ТЕМА =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Переключаем тему
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ===== МОДАЛЬНОЕ ОКНО =====
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.btn-details');
    
    // Данные проектов
    const projectsData = {
        1: {
            title: "Магические блоки",
            description: "Инновационная головоломка с уникальной механикой блок-пазлов. Каждый уровень представляет собой новую логическую задачу, требующую стратегического мышления и креативного подхода.",
            details: "Разработано на Unity с использованием C#. Особенности: динамическая генерация уровней, система достижений, адаптивная сложность.",
            tech: ["Unity", "C#", "Pixel Art", "Game Design"],
            videos: ["movies/movie1.mp4"],
            images: ["images/image1.jpg"]
        },
        2: {
            title: "Фрутняшка",
            description: "Динамичная казуальная аркада с фруктовой тематикой. Быстрая реакция и стратегическое планирование - ключевые элементы успеха.",
            details: "Проект включает систему комбо, магазин улучшений и ежедневные награды. Оптимизирован для мобильных платформ.",
            tech: ["Unity", "C#", "2D Graphics", "Mobile"],
            videos: ["movies/movie2.mp4"],
            images: ["images/image2.jpg", "images/image2_1.jpg", "images/image2_2.jpg", "images/image2_3.jpg"]
        },
        7: {
            title: "Галактический патруль",
            description: "3D космический шутер с элементами стратегии. Эволюция от простого 2D прототипа на Construct3 до полноценного 3D проекта на Unity.",
            details: "Проект демонстрирует рост навыков от 2D к 3D разработке. Включает систему апгрейдов, боссов и мультиплеерный режим.",
            tech: ["Unity", "C#", "3D Modeling", "Shader Graph", "Networking"],
            videos: ["movies/movie7.mp4", "movies/movie7_1.mp4"],
            images: ["images/image7.jpg"]
        }
    };
    
    // Открытие модального окна
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                openModal(project);
            }
        });
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openModal(project) {
        const modalBody = document.getElementById('modalBody');
        
        // Создаем контент модального окна
        modalBody.innerHTML = `
            <div class="modal-project">
                <h2>${project.title}</h2>
                <p class="modal-description">${project.description}</p>
                <p class="modal-details">${project.details}</p>
                
                <div class="modal-tech">
                    <h4>Технологии:</h4>
                    <div class="tech-tags">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                ${project.videos.map(video => `
                    <div class="modal-video">
                        <video src="${video}" controls></video>
                    </div>
                `).join('')}
                
                ${project.images.map((image, index) => `
                    <div class="modal-image">
                        <img src="${image}" alt="${project.title} - изображение ${index + 1}">
                    </div>
                `).join('')}
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Останавливаем все видео
        modal.querySelectorAll('video').forEach(video => {
            video.pause();
        });
    }
}

// ===== ПЛАВНЫЙ СКРОЛЛ =====
function initSmoothScroll() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', () => {
    // Небольшая задержка для плавного появления
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== РЕСАЙЗ ОКНА =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Обновляем размеры и позиции элементов при необходимости
        if (typeof createParticles === 'function') {
            document.getElementById('particles').innerHTML = '';
            createParticles();
        }
    }, 250);
});
