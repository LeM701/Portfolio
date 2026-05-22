document.addEventListener('DOMContentLoaded', () => {

    // ===== PARTICLES BACKGROUND =====
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const PARTICLE_COUNT = 90;
        const CONNECTION_DISTANCE = 130;
        const particles = [];

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 1.8 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.45;
                this.speedY = (Math.random() - 0.5) * 0.45;
                this.opacity = Math.random() * 0.45 + 0.15;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 123, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        const alpha = 0.18 * (1 - dist / CONNECTION_DISTANCE);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 123, 255, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ===== BURGER NAV =====
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        if (!burger) return;

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(item => item.style.animation = '');
                }
            });
        });
    };
    navSlide();

    // ===== SWIPER =====
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    // ===== TYPED TEXT (HERO) =====
    const heroParagraph = document.querySelector('#hero .hero-content p');
    if (heroParagraph && typeof Typed !== 'undefined') {
        new Typed(heroParagraph, {
            strings: [
                "Student at Epitech in MSc Pro AI",
                "Full-Stack Web Developer"
            ],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // ===== SCROLL REVEAL =====
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hero-content h1', {
            delay: 200, duration: 1000, origin: 'bottom', distance: '50px', easing: 'ease-in-out'
        });
        ScrollReveal().reveal('.hero-content p', {
            delay: 500, duration: 1000, origin: 'bottom', distance: '50px', easing: 'ease-in-out'
        });
        ScrollReveal().reveal('.hero-content .btn', {
            delay: 800, duration: 1000, origin: 'bottom', distance: '50px', easing: 'ease-in-out'
        });
        ScrollReveal().reveal('.section-title', {
            delay: 200, duration: 800, origin: 'top', distance: '30px', easing: 'ease-out', interval: 100,
        });
        ScrollReveal().reveal('.about-image img', {
            delay: 300, duration: 900, origin: 'left', distance: '50px', easing: 'ease-out'
        });
        ScrollReveal().reveal('.about-text', {
            delay: 500, duration: 900, origin: 'right', distance: '50px', easing: 'ease-out'
        });
        ScrollReveal().reveal('.skill-item', {
            delay: 200, duration: 800, interval: 100, origin: 'bottom', distance: '30px', easing: 'ease-out'
        });
        ScrollReveal().reveal('.project-card', {
            delay: 200, duration: 800, interval: 100, origin: 'bottom', distance: '30px', easing: 'ease-out'
        });
        ScrollReveal().reveal('.contact-form', {
            delay: 200, duration: 900, origin: 'bottom', distance: '50px', easing: 'ease-out'
        });
        ScrollReveal().reveal('.social-links a', {
            delay: 400, duration: 800, interval: 100, origin: 'bottom', distance: '30px', easing: 'ease-out'
        });
    }

    // ===== GSAP HEADER + NAV ENTRANCE =====
    if (typeof gsap !== 'undefined') {
        gsap.from("#header", { y: -100, duration: 1, ease: "power2.out", delay: 0.5 });
        gsap.from(".logo", { opacity: 0, x: -50, duration: 0.8, ease: "power2.out", delay: 1 });
        gsap.from(".nav-links li", { opacity: 0, y: -20, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 1.2 });

        // Skill items hover with GSAP
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
            });
        });
    }

    // ===== CONTACT FORM =====
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    const messageBox = document.createElement('p');
    messageBox.style.cssText = 'margin-top:15px; text-align:center; font-weight:600; opacity:0; transition:opacity 0.5s ease;';
    form.appendChild(messageBox);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        messageBox.textContent = '';
        messageBox.style.opacity = '0';

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                messageBox.textContent = '✅ Your message has been sent successfully!';
                messageBox.style.color = 'var(--accent-color)';
                form.reset();
            } else {
                messageBox.textContent = '❌ Something went wrong. Please try again.';
                messageBox.style.color = '#ff4d4d';
            }
        } catch (err) {
            messageBox.textContent = '⚠️ Network error. Please check your connection.';
            messageBox.style.color = '#ff4d4d';
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(messageBox, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
        } else {
            messageBox.style.opacity = '1';
        }
    });
});