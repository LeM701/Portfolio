document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

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

    const swiper = new Swiper('.mySwiper', {
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
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // --- TYPED TEXT (HERO) ---
    const heroParagraph = document.querySelector('#hero .hero-content p');
    if (heroParagraph) {
        new Typed(heroParagraph, {
            strings: ["Student at Epitech in MSc Pro AI", "Full-Stack Web Developer"],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true,
            showCursor: true,
            cursorChar: '',
        });
    }

    // --- SCROLL REVEAL ---
    ScrollReveal().reveal('.hero-content h1', {
        delay: 200,
        duration: 1000,
        origin: 'bottom',
        distance: '50px',
        easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.hero-content p', {
        delay: 500,
        duration: 1000,
        origin: 'bottom',
        distance: '50px',
        easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.hero-content .btn', {
        delay: 800,
        duration: 1000,
        origin: 'bottom',
        distance: '50px',
        easing: 'ease-in-out'
    });

    ScrollReveal().reveal('.section-title', {
        delay: 200,
        duration: 800,
        origin: 'top',
        distance: '30px',
        easing: 'ease-out',
        interval: 100,
    });

    ScrollReveal().reveal('.about-image img', {
        delay: 300,
        duration: 900,
        origin: 'left',
        distance: '50px',
        easing: 'ease-out'
    });
    ScrollReveal().reveal('.about-text', {
        delay: 500,
        duration: 900,
        origin: 'right',
        distance: '50px',
        easing: 'ease-out'
    });

    ScrollReveal().reveal('.skill-item', {
        delay: 200,
        duration: 800,
        interval: 100,
        origin: 'bottom',
        distance: '30px',
        easing: 'ease-out'
    });

    ScrollReveal().reveal('.project-card', {
        delay: 200,
        duration: 800,
        interval: 100,
        origin: 'bottom',
        distance: '30px',
        easing: 'ease-out'
    });

    ScrollReveal().reveal('.contact-form', {
        delay: 200,
        duration: 900,
        origin: 'bottom',
        distance: '50px',
        easing: 'ease-out'
    });
    ScrollReveal().reveal('.social-links a', {
        delay: 400,
        duration: 800,
        interval: 100,
        origin: 'bottom',
        distance: '30px',
        easing: 'ease-out'
    });

    gsap.from("#header", { y: -100, duration: 1, ease: "power2.out", delay: 0.5 });
    gsap.from(".logo", { opacity: 0, x: -50, duration: 0.8, ease: "power2.out", delay: 1 });
    gsap.from(".nav-links li", { opacity: 0, y: -20, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 1.2 });

    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });

    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    const messageBox = document.createElement('p');
    messageBox.style.marginTop = '15px';
    messageBox.style.textAlign = 'center';
    messageBox.style.fontWeight = '600';
    messageBox.style.transition = 'opacity 0.5s ease';
    messageBox.style.opacity = '0';

    form.appendChild(messageBox);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset message
        messageBox.textContent = '';
        messageBox.style.color = '';
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

        gsap.fromTo(messageBox, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    });
});
