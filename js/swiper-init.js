document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('#hero-slide', {
        loop: true, // Бесконечная прокрутка
        effect: 'fade', // Эффект перехода (например, fade)
        grabCursor: true, // Изменение курсора при перетаскивании
        pagination: {
            el: '.swiper-pagination', // Пагинация
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next', // Кнопка "Вперед"
            prevEl: '.swiper-button-prev', // Кнопка "Назад"
        },
        autoplay: {
            delay: 5000, // Автопрокрутка каждые 5 секунд
        },
    });
});