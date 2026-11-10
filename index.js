// =============================================
// НОВЫЙ ПРОФЕССИОНАЛЬНЫЙ СЛАЙДЕР (Hero)
// =============================================

let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-bg');
const dots = document.querySelectorAll('.slider-dots .dot');

function showSlide(index) {
    // Плавный переход
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');

    // Активная точка
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    currentSlide = index;
}

// Автоматическая смена (4 секунды)
function nextSlide() {
    let next = currentSlide + 1;
    if (next >= heroSlides.length) next = 0;
    showSlide(next);
}

// Инициализация
showSlide(0);

// Авто-слайд каждые 4 секунды
setInterval(nextSlide, 4000);

// Кнопки "Вверх" и "Обсудить проект"
document.querySelector('.scroll-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('cta-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});
