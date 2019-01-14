'use strict';

jQuery(function () {
    frontend.init();
    modal.init();
});

var frontend = {

    init: function init() {
        this.events();
    },

    openTab: function openTab(element, tabName) {
        var i = void 0,
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

    events: function events() {

        var self = this;
    }
};

var modal = {
    closeButton: $('.js-close-modal'),
    closeOverlay: $('.modal'),

    init: function init() {
        this.events();
    },

    openModal: function openModal(id) {
        var modalWindow = $(id);
        modalWindow.fadeIn();
        modalWindow.find('.modal__content').removeClass('animate-away').addClass('animate-in');
        $('html,body').addClass('js-modal');
        $('html,body').off('scroll mousewheel touchmove');
    },

    closeModal: function closeModal(id) {
        var modalWindow = $(id);
        modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
        modalWindow.fadeOut();
        $('html,body').removeClass('js-modal');
        $('html,body').on('scroll mousewheel touchmove');
    },

    events: function events() {

        $(document).on('click', '.modalTrigger', function (e) {
            e.preventDefault();
            var self = $(this),
                target = self.attr('data-modal');
            modal.openModal(target);
        });

        $(document).on('click', '.modal', function (event) {
            var self = '#' + $(this).attr('id');
            if (event.target.className == 'modal__body') {
                modal.closeModal(self);
            }
        });

        $(document).on('click', '.js-close-modal', function () {
            var self = '#' + $(this).closest('.modal').attr('id');
            modal.closeModal(self);
        });
    }
};