let clickEvent = false;
$(document).ready(function () {
	// 現在のページのURLを取得
	var currentPageUrl = window.location.href;
	// 現在のURLにIDが含まれているかの条件分岐
	if (currentPageUrl.includes("#")) {
		if($(window).width() > 768){
			$('.header').addClass('js_hide');
		};
	};
});

document.addEventListener('DOMContentLoaded', function () {
	const header = $('.header');
	const headerHeight = header.outerHeight();
	let beforeScrollTop = 0;
	$(window).scroll(function () {
		if($(window).width() > 768 && clickEvent===false) {
			const scrollTop = $(this).scrollTop();
			if((scrollTop > beforeScrollTop) && (scrollTop > headerHeight)) {
				header.addClass('js_hide');
			}
			else {
				header.removeClass('js_hide');
			}
			beforeScrollTop = scrollTop;
		}else if(clickEvent){
			//同一ページ内で上に移動する際に上へのscrollイベントが検知してヘッダーを表示しないようにスクロールが終わるまで待機
			setTimeout(function () {
				clickEvent = false;
			}, 200);
		}
	});
});

document.addEventListener('DOMContentLoaded', function () {
	$(function() {
		$(".hamburger1").click(function () {
			if($(this).hasClass('active')){
				$(".d_nav").scrollTop(0);
			}
			$(this).toggleClass('active');
			$(".nav_wrap").toggleClass('active');
			$(".overlay").toggleClass('active');
			$(".header").toggleClass("active");
			mediaQueriesWin();
		});
		$(".dropdown_list a").click(function () {
			var width = $(window).width();
			if(width <= 768){
				$(".d_nav").scrollTop(0);
				$(".hamburger1").removeClass('active');
				$(".nav_wrap").removeClass('active');
				$(".overlay").removeClass('active');
				$(".header").removeClass("active");
				mediaQueriesWin();
			}else {
				clickEvent = true;
				$(".header").addClass('js_hide');
			}
		});
		$(".overlay").click(function () {
			$(".d_nav").scrollTop(0);
			$(".hamburger1").removeClass('active');
			$(".nav_wrap").removeClass('active');
			$(".overlay").removeClass('active');
			$(".header").removeClass("active");
			mediaQueriesWin();
		})
	});
});

function mediaQueriesWin(){
	var width = $(window).width();
	if(width <= 768 && $('.hamburger1').hasClass('active')){
		$(".has-child").on('click',function(){
			var parentElem = $(this).parent();
			if(parentElem.hasClass('home')){
				$('.nav_list.blue').toggleClass('ha');
				$('.nav_list.ref').toggleClass('ha');
			}else if(parentElem.hasClass('blue')){
				$('.nav_list.ref').toggleClass('ba');
			}
			$(this).toggleClass('active');
			$(parentElem).toggleClass('active');
			$(parentElem).children('ul').toggleClass('active');
		});
		$(".child-wrap").on('click',function(){
			var parentElem = $(this).parent();
			var broElem = $(this).next();
			if(parentElem.hasClass('home')){
				$('.nav_list.blue').toggleClass('ha');
				$('.nav_list.ref').toggleClass('ha');
			}else if(parentElem.hasClass('blue')){
				$('.nav_list.ref').toggleClass('ba');
			}
			$(broElem).toggleClass('active');
			$(parentElem).toggleClass('active');
			$(parentElem).children('ul').toggleClass('active');
		});
	}else{
		close();
	}
}