'use strict';

/* ====================== ПОЯВЛЕНИЕ КАРТОЧКИ ПРИ СКРОЛЛЕ ====================== */
(function initRevealOnScroll() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = Number(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('is-visible'), delay);
            obs.unobserve(el);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    items.forEach(el => observer.observe(el));
})();


/* ====================== СКРОЛЛ К БЛОКУ ПО КНОПКЕ ====================== */
(function initCardScroll() {
    const buttons = document.querySelectorAll('.card-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const card = btn.closest('.card');
            if (!card) return;

            const id = card.dataset.id;
            if (!id) {
                console.warn('У карточки нет data-id:', card);
                return;
            }

            const target = document.getElementById(id);
            if (!target) {
                console.warn('Не найден блок с id =', id);
                return;
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            target.classList.add('highlight-target');
            setTimeout(() => target.classList.remove('highlight-target'), 1200);
        });
    });
})();
(function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    const SHOW_AFTER = 400;   // показывать кнопку после 400px скролла

    const toggle = () => {
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    };

    // Проверяем состояние при загрузке
    toggle();

    // Следим за скроллом
    window.addEventListener('scroll', toggle, { passive: true });

    // Клик — плавный скролл наверх
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();