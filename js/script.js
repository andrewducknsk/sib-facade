'use strict';

(function () {
    var menuMobile = document.querySelector('.menu--js');
    var menuBtn = document.querySelector('.menu__btn--js');

    menuBtn.addEventListener('click', function () {
        if (menuMobile.classList.contains('menu--closed')) {
            menuMobile.classList.remove('menu--closed');
        } else {
            menuMobile.classList.add('menu--closed');
        }
    })
}());

(function () {
    var upBtn = document.querySelector('.up');
    var main = document.querySelector('.main-js');

    var mainPosition = main.getBoundingClientRect().top;

    window.addEventListener('scroll', function() {
        var scrolled = window.pageYOffset + 1;

        if (scrolled > mainPosition) {
            upBtn.classList.remove('up--none');
        } else {
            upBtn.classList.add('up--none');
        }
    });
}());

window.history.replaceState({initial: true}, "");

$('.up-js-btn').on("click", function(e) {
    e.preventDefault();

    window
        .history
        .pushState(
            {initial: true},
            ""
        );

        scrollTo(false);
});

$(".menu a, .greeting a").on("click", function(e) {
    e.preventDefault();

    var $self = $(this);

    pushHistory(
        $self.text(),
        getLocation(this.href).hash
    );
});

window.onpopstate = function(e) {
    if (e.state && e.state.selector) {
        scrollTo(e.state.selector);
    } else if (e.state && e.state.initial) {
        scrollTo(false);
    }
};

function scrollTo(hash) {
    $([document.documentElement, document.body]).animate({
        scrollTop: (!hash) ? 0 : $(hash).offset().top
    }, 350);
}

function pushHistory(title, hash) {
    window
        .history
        .pushState(
            {selector: hash},
            title,
            hash
        );

        scrollTo(hash);
}

function getLocation(href) {
    var l = document.createElement("a");
    l.href = href;

    return l;
}

(function () {
    $(document).ready(function () {
        $('.lightzoom').lightzoom({
            speed: 350,
            viewTitle: true,
            isOverlayClickClosing: true,
            isEscClosing: true
        });
    });
})();