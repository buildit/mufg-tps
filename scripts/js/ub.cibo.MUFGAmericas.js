/*jslint devel: true, bitwise: false, browser: true, node: false, white: true, maxerr: 50, this: true */

/*global window, jQuery */

var jquery = jQuery.noConflict();
(function (window, $) {
    "use strict";

    var ub = window.ub;
    ub.cibo = ub.cibo || {};

    ub.cibo.MUFGAmericas = (function() {

        /*
            Function: initCarousel
            Initializes the Slick slider plugin.
        */
        function initCarousel() {
            var carousel = $('.carousel');
            $(carousel).on('init', function(){
                $('.slick-active').addClass('item-active');
            });
            $(carousel).on('beforeChange', function(ignore, slick, currentSlide, nextSlide){
                $('.item-active').removeClass('item-active');
                // test for beginning of loop
                if (currentSlide === 0) {
                    $('.news-item[data-slick-index="-1"]').addClass('item-active');
                }
                // test for end of loop
                if ((currentSlide + 1) === slick.slideCount) {
                    $('.news-item[data-slick-index="'+(currentSlide + 1)+'"]').addClass('item-active');
                }
                $('.news-item[data-slick-index="'+nextSlide+'"]').addClass('item-active');
            });
            $('.carousel').slick({
                dots: true,
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 1,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            centerMode: false,
                            centerPadding: '0px',
                            slidesToShow: 1
                        }
                    }
                ],
                autoplay: true,
                autoplaySpeed: 2000
            });
        }

        /*
            Function: whichTransitionEvent
            Determines which transition prefix to use.
        */
        function whichTransitionEvent(){
            var t,
                el = document.createElement('element'),
                transitions = {
                    'transition':'transitionend',
                    'OTransition':'oTransitionEnd',
                    'MozTransition':'transitionend',
                    'WebkitTransition':'webkitTransitionEnd'
                };

            $.each(transitions, function(i){
                if( el.style[i] !== undefined ){
                    t = transitions[i];
                    return false;
                }
            });

            return t;
        }

        /*
            Function: initPage
            Initializes global page level elements.
        */
        function initPage() {

            var transitionEvent = whichTransitionEvent();

            if ($('body').hasClass('init-carousel')) {
                initCarousel();
            }

            // show/hide main nav
            var mainNav = $('.main-nav-links'),
                subNav = $('.main-sub-nav'),
                fadeTimer = 350;
            $('.nav-link-hover',mainNav).on('mouseenter',function(){
                clearTimeout(mainNav.data('timeoutId'));
                var group = $(this).data('group');
                $('.nav-link-hover.link-active').removeClass('link-active');
                $(this).addClass('link-active');
                $('.sub-nav-group.group-active').removeClass('group-active');
                $('.sub-nav-group[data-group="'+group+'"]').addClass('group-active');
                subNav.fadeIn(200);
            }).on('mouseleave',function(){
                var timeoutId = setTimeout(function(){
                    $('.nav-link-hover.link-active').removeClass('link-active');
                    subNav.fadeOut(200);
                },fadeTimer);
                mainNav.data('timeoutId',timeoutId);
            });

            // show/hide sub nav
            subNav.on('mouseenter',function(){
                clearTimeout(mainNav.data('timeoutId'));
                var group = $('.group-active',this).data('group');
                $('.nav-link-hover[data-group="'+group+'"]').addClass('link-active');
            }).on('mouseleave',function(){
                var timeoutId = setTimeout(function(){
                    $('.nav-link-hover.link-active').removeClass('link-active');
                    subNav.fadeOut(200);
                },fadeTimer);
                mainNav.data('timeoutId',timeoutId);
            });

            // triggers for opening/closing mobile menu
            $('.mobile-nav-open').on('click', function() {
                $('body').addClass('mobile-nav-open');
            });
            $('.mobile-nav-close').on('click', function() {
                $('body').addClass('mobile-nav-close');
                $('.container').one(transitionEvent, function(){
                    $('body').removeClass('mobile-nav-open mobile-nav-close');
                    $('.mobile-nav-secondary').removeClass('nav-active');
                });
            });

            // trigger for accessing mobile sub nav
            $('.nav-group-link-hover').on('click', function(e){
                e.preventDefault();
                var group = $(this).data('group');
                $('.nav-group.group-active').removeClass('group-active');
                $('.nav-group[data-group="'+group+'"]').addClass('group-active');
                $('.mobile-nav-secondary').addClass('nav-active');
            });

            // return to main sub nav listing
            $('.secondary-return-link').on('click', function(e){
                e.preventDefault();
                $('.mobile-nav-secondary').removeClass('nav-active');
            });

            /*
             Handle search box open/close
             */
            // show the search input
            $('.nav-search-icon').on('click', function(e) {
                e.preventDefault();
                $('.nav-search').addClass('search-open');
                $('.nav-search input').focus();
            });
            // close search input
            $('.nav-search-close').on('click', function(e) {
                e.preventDefault();
                $('.nav-search').removeClass('search-open');
            });
            // close search when click outside
            $('html').click(function() {
                //Hide the menus if visible
                $('.nav-search').removeClass('search-open');
            });

            $('.nav-search').click(function(event){
                event.stopPropagation();
            });

            // handle carousel navigation when clicking on prev next slides
            $('.slick-slide').on('click', function(e){
                e.preventDefault();
                var currentSlide = $('.carousel').slick('slickCurrentSlide');
                var slideIndex = $(this).data('slick-index');
                if( currentSlide !== slideIndex){
                    $('.carousel').slick('slickGoTo', parseInt(slideIndex) );
                }
            });
        }

        return { init : initPage };

    }());

    $(document).ready(function(){ ub.cibo.MUFGAmericas.init(); });

}(window, jquery));


