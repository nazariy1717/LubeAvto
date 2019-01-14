
jQuery(function () {
    frontend.init();
    modal.init();
});

let frontend = {

    init: function () {
        this.events();
    },

    openTab: function (element, tabName) {
        let i,
            tab_content = document.getElementsByClassName('tab-content'),
            tab_links = document.getElementsByClassName('tab-links');
        for (i = 0; i < tab_content.length; i++) {
            tab_content[i].style.display = "none";
        }
        for (i = 0; i < tab_links.length; i++) {
            tab_links[i].className = tab_links[i].className.replace(" active", "");
        }
        document.querySelector(tabName).style.display = "block";
        element.classList.add('active');
    },

    events: function () {

        let self = this;

    }
};


let modal = {
    closeButton: $('.js-close-modal'),
    closeOverlay: $('.modal'),

    init: function () {
        this.events();
    },

    openModal: function (id) {
        let modalWindow = $(id);
        modalWindow.fadeIn();
        modalWindow.find('.modal__content').removeClass('animate-away').addClass('animate-in');
        $('html,body').addClass('js-modal');
        $('html,body').off('scroll mousewheel touchmove');
    },

    closeModal: function (id) {
        let modalWindow = $(id);
        modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
        modalWindow.fadeOut();
        $('html,body').removeClass('js-modal');
        $('html,body').on('scroll mousewheel touchmove');
    },

    events: function () {

        $(document).on('click', '.modalTrigger', function (e) {
            e.preventDefault();
            let self = $(this),
                target = self.attr('data-modal');
            modal.openModal(target);
        });

        $(document).on('click', '.modal', function (event) {
            let self = '#' + $(this).attr('id');
            if (event.target.className == 'modal__body') {
                modal.closeModal(self);
            }
        });

        $(document).on('click', '.js-close-modal', function () {
            let self = '#' + $(this).closest('.modal').attr('id');
            modal.closeModal(self);
        });

    }
};

