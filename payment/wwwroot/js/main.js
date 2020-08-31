// Note: See http://blog.garstasio.com/you-dont-need-jquery/ and http://youmightnotneedjquery.com/ for JS commands that don't require jQuery
"use strict";

var DnDMoM = {};
$(document).ready(function () {
	var $window = $(window);
	var $body = $("body");
	//init main navigation sub-menu behavior
	DnDMoM.dropdown();
	DnDMoM.toggleMobile();
	DnDMoM.toggleShowPassword();
	DnDMoM.paymentMethod();
	DnDMoM.selectCustom();
});

//functions
DnDMoM = (function ($) {
	return {
		tabs: function () {
			// Tab pannel
			if ($(".tabs").length > 0) {
				$(".tabs").each(function ($tab) {
					var $tab = $(this);
					var tabArray = $tab.find(".tabs-link a");
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
		toggleMobile: function () {
			var clickTriggerEvent = Modernizr.touch ? "touchend" : "click";
			var buttonMobi = $("#nav-toggle");
			var navMobi = $(".nav");
			buttonMobi.on(clickTriggerEvent, function () {
				navMobi.toggleClass("is-opened");
				$("body").toggleClass("nav-opened");
			});
		},
		toggleShowPassword: function () {
			var clickTriggerEvent = Modernizr.touch ? "touchend" : "click";
			$("#show-password").on(clickTriggerEvent, function () {
				$("#password").attr("type", function (index, attr) {
					return attr == "password" ? "text" : "password";
				});
			});
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
		selectCustom: function () {
			var wrapSelect = $(".select-custom");
			if (wrapSelect.get(0)) {
				wrapSelect.find(".select-custom-option").niceScroll(".select-custom-list");
				var clickTriggerEvent = Modernizr.touch ? "touchend" : "click";
				wrapSelect.each(function () {
					var $this = $(this);
					$this.find(".select-custom-current").on(clickTriggerEvent, function () {
						if ($(this).parent().hasClass("is-opened")) {
							wrapSelect.removeClass("is-opened");
						} else {
							wrapSelect.removeClass("is-opened");
							$(this).parent().addClass("is-opened");
							$(this).parent().find(".select-custom-option").getNiceScroll().resize();
						}
					});
					$this.find(".select-custom-list li").on(clickTriggerEvent, function () {
						$(this).siblings().removeClass("selected");
						$(this).addClass("selected");
						$(this).parents().closest(wrapSelect).find(".select-custom-current").val($(this).data("option"));
						$(this).parents().closest(wrapSelect).removeClass("is-opened");
					});
				});
			}
		},
		paymentMethod: function () {
			var btnHide = $(".card-control");
			var btnShow = $(".list-cardpay-item.more");
			var clickTriggerEvent = Modernizr.touch ? "touchend" : "click";
			var payMethod = "";
			var coins = 0,
				thanhtien = 0;
			$(".list-cardpay .list-cardpay-item:gt(2)").not('.more').hide(0).css({ opacity: 0 });
			btnShow.on(clickTriggerEvent, function () {
				btnShow.hide(0);
				$(".list-cardpay .list-cardpay-item:gt(2)").not('.more').each(function (i) {
					var $this = $(this);
					setTimeout(function () {
						$this.show().animate({
							opacity: 1,
						})
					}, 100 * i)

				});
				btnHide.fadeIn(200);
				$(this).parent().addClass("opened");
				$(".box-pay").addClass("openpay");

			});
			btnHide.on(clickTriggerEvent, function () {
				btnShow.show(0);
				btnHide.hide(0);
				$(".list-cardpay .list-cardpay-item:gt(2)").not('.more').hide().css({ opacity: 0 });

				$(this).removeClass("opened");
			});
			$(".list-cardpay .list-cardpay-item:not(.more)").on(clickTriggerEvent, function () {
				$(this).siblings().removeClass("select");
				$(this).addClass("select");
				$(".wrap-card").find(".error").hide();
				payMethod = $(this).data("method");
				$("#payMethod").val(payMethod);
			});
			$(".box-credit .table-border tbody tr").on(clickTriggerEvent, function () {
				$(this).siblings().removeClass("selected");
				$(this).addClass("selected");
				$(".box-credit-info").find(".error").hide();
				coins = $(this).find("th span").text();
				thanhtien = $(this).find("td span").text();
				$("#Coins").text(coins);
				$("#thanhtien").val(thanhtien);
			});
			$(".form-pay").on("submit", function (e) {
				e.preventDefault();
				var dataPay = $(this).serialize();
				var apiSubmit = $(this).attr("action");
				if (payMethod == "") {
					$("html, body").animate({ scrollTop: $(".wrap-card").offset().top }, 1200);
					$(".wrap-card").find(".error").show();
					return false;
				}
				if (thanhtien == 0) {
					$("html, body").animate({ scrollTop: $(".box-credit-info").offset().top }, 1200);
					$(".box-credit-info").find(".error").show();
					return false;
				}
				if (payMethod != "" && thanhtien != 0) {
					$.ajax({
						type: "POST",
						url: apiSubmit,
						data: dataPay,
						success: function (data) {
							console.log(data);
						},
					});
				}
			});
		},
	};
})(jQuery);
