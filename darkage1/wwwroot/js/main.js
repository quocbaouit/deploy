// Note: See http://blog.garstasio.com/you-dont-need-jquery/ and http://youmightnotneedjquery.com/ for JS commands that don't require jQuery
"use strict";

var DnDMoM = {};
$(document).ready(function () {
	var $window = $(window);
	var $body = $("body");
	//init main navigation sub-menu behavior
	DnDMoM.initMainNav();
	DnDMoM.dropdown();
	DnDMoM.toggleSidebar();
	DnDMoM.toggleMobile();
	// fancybox top nav
	if ($(".fancybox").length > 0) {
		DnDMoM.initPopup(".fancybox");
	}
	// tabs
	if ($(".tabs").length > 0) {
		DnDMoM.tabs();
	}

	// accordion
	if ($(".accordion").length > 0) {
		DnDMoM.initAccordion();
	}
	if ($(".niceScroll").get(0)) {
		DnDMoM.initNiceScroll(".niceScroll");
	}
	//init events banner slider, Character slide on homepage
	if ($body.hasClass("homepage")) {
		DnDMoM.loadmoreMobi();

		// Tao banner even
		if ($(".slider .swiper-container").length != 0) {
			var eventBanner = new Swiper(".slider .swiper-container", {
				autoplay: {
					delay: 2000,
				},
				speed: 600,
				slidesPerView: "auto",
				centeredSlides: true,
				spaceBetween: 20,
				centeredSlidesBounds: true,
				effect: "slide", //"slide", "fade", "cube", "coverflow" or "flip"
				// autoHeight: true
				disableOnInteraction: true,
				// autoplayDisableOnInteraction:true,
				preventClicks: false,
				navigation: {
					nextEl: ".slider .swiper-button-next",
					prevEl: ".slider .swiper-button-prev",
				},
				pagination: {
					el: ".slider .swiper-pagination",
					type: "bullets",
					clickable: true,
				},
			});
		}

		// Tao banner Character
		if ($(".choose-figure .swiper-container").length != 0) {
			var hotEvent = new Swiper(".choose-figure .swiper-container", {
				pagination: {
					el: ".choose-figure .swiper-pagination",
					type: "bullets",
					clickable: true,
				},
				autoplay: {
					delay: 3000,
				},
				speed: 900,
				disableOnInteraction: true,
				preventClicks: false,
			});
		}
	}
});

//functions
DnDMoM = (function ($) {
	return {
		initMainNav: function () {
			//main navigation
			var mainNavList = $(".nav");
			var mainNavTriggerEvent = Modernizr.touch ? "touchend" : "click";
			if (Modernizr.mq("only screen and (max-width: 780px)")) {
				mainNavList.on(mainNavTriggerEvent, ".nav-item.has-sub .nav-link", function (e) {
					$(".nav-item.has-sub .nav-sub").not(this).slideUp();
					if ($(this).hasClass("isOpen")) {
						$(this).parent().removeClass("focus");
						$(this).parent().find(".nav-sub").slideUp();
						$(this).removeClass("isOpen");
					} else {
						$(this).parent().addClass("focus");
						$(this).addClass("isOpen");
						$(this).parent().find(".nav-sub").slideDown();
					}

					return false;
				});
			} else {
				$(".nav-item.has-sub .nav-link").on(mainNavTriggerEvent, function (e) {
					$(this).parent().siblings().removeClass("focus");
					$(this).parent().find(".nav-sub a").removeClass("active");
					if ($(this).parent().hasClass("focus")) {
						$(this).parent().removeClass("focus");
					} else {
						$(this).parent().addClass("focus");
						$(this)
							.parent()
							.find(".nav-sub a")
							.on(mainNavTriggerEvent, function () {
								$(".nav-sub a").removeClass("active");
								$(this).addClass("active");
							});
					}
				});
				$(".main").on(mainNavTriggerEvent, function (e) {
					$(".nav-item.has-sub.focus").removeClass("focus");
				});
			}
		},
		tabs: function () {
			// Tab pannel
			if ($(".tabs").length > 0) {
				$(".tabs").each(function ($tab) {
					var $tab = $(this);
					var tabArray = $tab.find(".tabs-link a").not(".link");
					tabArray.eq(0).addClass("active");
					$tab.find(".tabs-detail").eq(0).fadeIn(100);

					tabArray.on("click", function (e) {
						e.preventDefault();
						tabArray.removeClass("active");
						$(this).addClass("active");
						$tab.find(".tabs-detail").hide();
						var curId = $(this).attr("href");
						$(curId).fadeIn(100);
						return false;
					});
				});
			}

			// CONTENT CSS MENU
			$("#menu-function").on("click", function () {
				$(".menu-dropdown").toggle("active");
			});
		},
		dropdown: function () {
			//Function dropdown
			var dropdownWrap = $(".dropdown");
			var buttonToggle = $(".dropdown-toggle");
			var dropdownMenu = $(".dropdown-menu");
			var dropdowTriggerEvent = Modernizr.touch ? "touchend" : "click";
			buttonToggle.on(dropdowTriggerEvent, function (e) {
				dropdownWrap.toggleClass("show");
				dropdownWrap.find(dropdownMenu).toggleClass("show").slideToggle();
			});
		},
		toggleSidebar: function () {
			var sidebar = $(".right-menu");
			var sidebarShow = $("#sidebar-menu");
			var sidebarButton = $(".right-menu-arrow");
			var dropdowTriggerEvent = Modernizr.touch ? "touchend" : "click";
			sidebarButton.on(dropdowTriggerEvent, function (e) {
				sidebar.toggleClass("show");
				//dropdownWrap.find(dropdownMenu).toggleClass("show").slideToggle();
			});
		},
		initPopup: function (selector) {
			$(selector).fancybox({
				openEffect: 'elastic',
				autoCenter: true,
				padding: [7, 7, 7, 7],
				helpers: {
					title: {
						type: 'inside'
					},
					media: {}
				},
				nextEffect: 'elastic',
				prevEffect: 'elastic'
			});
		},
		initAccordion: function () {
			var accordion = $(".accordion-block");
			var accordionTrigger = $(".accordion-icon, .box-faq-question");
			var dropdowTriggerEvent = Modernizr.touch ? "touchend" : "click";
			accordion.on(dropdowTriggerEvent, accordionTrigger, function () {
				$(this).toggleClass("is-show");
				$(this).find(".box-faq-answer").slideToggle();
			});
		},
		initNiceScroll: function (selector) {
			$(selector).niceScroll({});
		},
		loadmoreMobi: function () {
			var btnMore = $(".box-media .loadmore");
			var clickTriggerEvent = Modernizr.touch ? "touchend" : "click";
			var initLoad = function () {
				if (Modernizr.mq("only screen and (max-width: 780px)")) {
					$(".box-media .group a.span3:gt(3)").hide();
					btnMore.each(function () {
						var $this = $(this);
						$this.on(clickTriggerEvent, function () {
							$this.parent().find("a.span3:gt(3)").fadeIn();
							$this.fadeOut();
						});
					});
				} else {
					$(".box-media .group a.span3:gt(3)").removeAttr("style");
				}
			};
			$(window).on("load resize", initLoad);
		},
		toggleMobile: function () {
			var clickTriggerEvent = Modernizr.touch ? "touchend" : "click";
			var buttonMobi = $("#nav-toggle");
			var navMobi = $(".nav");
			var buttonMobi = $("#nav-toggle");
			var navMobi = $(".nav");
			buttonMobi.on(clickTriggerEvent, function () {
				navMobi.toggleClass("is-opened");
				$("body").toggleClass("nav-opened");
			});
		},
	};
})(jQuery);
