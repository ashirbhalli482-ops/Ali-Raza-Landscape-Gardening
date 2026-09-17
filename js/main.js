document.addEventListener('click', function (event) {
    var toggler = event.target.closest('.navbar-toggler');
    if (toggler) {
        var menu = document.querySelector(toggler.getAttribute('data-bs-target') || '#navbarCollapse');
        if (!menu) {
            return;
        }
        event.preventDefault();
        var isOpen = menu.classList.toggle('show');
        toggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggler.classList.toggle('collapsed', !isOpen);
        return;
    }

    if (window.innerWidth < 992) {
        var dropdownToggle = event.target.closest('.navbar .dropdown-toggle');
        if (dropdownToggle) {
            event.preventDefault();
            var dropdownMenu = dropdownToggle.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.classList.toggle('show');
            }
            return;
        }

        var navLink = event.target.closest('.navbar-collapse .nav-link, .navbar-collapse .dropdown-item');
        if (navLink) {
            var openMenu = document.querySelector('.navbar-collapse.show');
            var openToggler = document.querySelector('.navbar-toggler');
            if (openMenu) {
                openMenu.classList.remove('show');
            }
            if (openToggler) {
                openToggler.setAttribute('aria-expanded', 'false');
                openToggler.classList.add('collapsed');
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.classList.remove('show');
    }

    initHeaderCarousel();
});

function initHeaderCarousel() {
    var carousel = document.getElementById('header-carousel');
    if (!carousel) {
        return;
    }

    var items = carousel.querySelectorAll('.carousel-item');
    if (items.length < 2) {
        return;
    }

    var index = 0;
    items.forEach(function (item, i) {
        if (item.classList.contains('active')) {
            index = i;
        }
    });

    function show(nextIndex) {
        items[index].classList.remove('active');
        index = (nextIndex + items.length) % items.length;
        items[index].classList.add('active');
    }

    var prevBtn = carousel.querySelector('.carousel-control-prev');
    var nextBtn = carousel.querySelector('.carousel-control-next');
    if (prevBtn) {
        prevBtn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            show(index - 1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            show(index + 1);
        });
    }

    var timer = setInterval(function () {
        show(index + 1);
    }, 5000);

    carousel.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
    });
    carousel.addEventListener('mouseleave', function () {
        if (!timer) {
            timer = setInterval(function () {
                show(index + 1);
            }, 5000);
        }
    });
}

(function ($) {
    "use strict";

    if (typeof $ === 'undefined') {
        return;
    }

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm');
        } else {
            $('.sticky-top').removeClass('shadow-sm');
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }

    if ($.fn.owlCarousel && $('.testimonial-carousel').length) {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });
    }
})(window.jQuery);
