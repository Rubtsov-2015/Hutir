/* script by ProVerstka */
$(document).ready(function(){
	new WOW().init();

	/* инициализация функций */
	initSvg($('.svg'));
	fixedMenu();
	if($(window).width() < 1201){
		burgerMenu();
	}
	popUps();
	initStick();
	slider_work();
	initBgImage($('.header_img_holder'), $('.header_img_holder img'));
	initBgImage($('.cloud_img_holder'), $('.cloud_img_holder img'));
	initBgImage($('.img_section'), $('.img_section>img'));
	initTextAccordion();
	initMaxHeight();
	smoothScroll();
	if($(window).width() > 1200 && $(window).height() > 700){
		initScrollr();
	}

	

	/* описание функций */
	$(".select_dropdown").dropdown();
	$(".input_date input").datepicker();

	$.datepicker.setDefaults(
        {
        closeText: 'Закрыть',
        prevText: '',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    });
           




	function initStick() {
		var inited = false;
		init();
		$(window).on('resize', function() {
			init();
		});
		function init() {
			if(!inited && $('.aside_menu_holder').length && $(window).innerWidth() > 767){
			$('.aside_menu_holder').stick_in_parent();
				inited = true;
			} else if(inited && $('.aside_menu_holder').length && $(window).innerWidth() < 768){
			$('.aside_menu_holder').trigger("sticky_kit:detach");
				inited = false;
			}
		};
	};

	$('.cottage_carousel').slick({
		slidesToShow: 4,
		infinite: false,
		responsive: [{
			breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},{
			breakpoint: 1000,
				settings: {
					slidesToShow: 2,
				}
			},{
			breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});
	$('.cottage_img_carousel').slick({
		slidesToShow: 1,
		arrows: false,
		fade: true,
		infinite: false,
		responsive: [{
			breakpoint: 550,
				settings: {
					arrows: true,
				}
			}
		]
	});
	$('.cottage_img_carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.cottage_img_carousel_nav li').eq(nextSlide).addClass('current').siblings('li.current').removeClass('current');
	});
	$('.cottage_img_carousel_nav li').click(function(){
		var index = $(this).index();
		$('.cottage_img_carousel').slick('slickGoTo', index);

	});
	$('.gallary_more_less_btn').click(function(){
		$(this).closest('ul').closest('li').toggleClass('open');
	});

	$('.price_tables td').click(function(){
		$(this).toggleClass('active');
	});

	//Ставим картинку на фон, _parent - на что вешать, _img - что вешаем
	function initBgImage(_parent, _img) {
		_img.each(function() {
			$(this).closest(_parent).css({
				'background-image': 'url(' + $(this).attr('src') + ')',
			})
		});
	};
	function initScrollr(){
		setTimeout(function(){
			var s = skrollr.init({
				smoothScrolling: false,
			});
		}, 300)
		if($('html').hasClass('skrollr-mobile')){
			s.destroy();
		};
	};

	function fixedMenu(){
		$(window).scroll(function(){
			if(($(window).scrollTop() - 150) > ($('.nav_wrapper').offset().top)){
				var height_nav = $('.nav_wrapper').outerHeight();
				$('.nav_wrapper').css({'height' : height_nav});
				$('.nav_holder').css({'margin-top': -height_nav});
				setTimeout(function() { $('.nav_holder').addClass('marginClass') }, 300);
				$('.nav_holder').addClass('fixed');
			}else{
				$('.nav_holder').removeClass('marginClass');
				$('.nav_holder').removeAttr('style');
				$('.nav_wrapper').removeAttr('style');
				$('.nav_holder').removeClass('fixed');
			}
		});
	};
	function burgerMenu(){
		$('.burger_menu').click(function(){
			$(this).toggleClass('active');
			var _nav = $(this).next();
			_nav.toggleClass('active');
			_nav.slideDown();
			if(_nav.hasClass('active')){
				$('body').css({'overflow':'hidden!important'});
			}else{
				$('body').css({'overflow':'auto'});
			}
		});
		$('.nav_holder nav ul li.nav_dropdown').click(function(){
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				$(this).find('ul').slideDown();
			}else{
				$(this).find('ul').slideUp();
			}
			return false;
		});
		 
	}
	function smoothScroll(){
		$('a.anchor').click(function (){
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top - 10 - $('.nav_holder').height();
			$('html,body').animate({
				scrollTop: destination
			}, 800);
			return false;
		});
	};
	

	function slider_work(){
		$('.slider_list li').click(function(){
			var slider_holder = $(this).closest('.slider_holder'),
				parent = $(this).closest('.slider_list'),
				decent_number = $(this).index();

			parent.find('li').each(function(){
				$(this).removeClass('active');
			});
			slider_holder.find('.slider_img li').each(function(){
				$(this).removeClass('active');
			});
			$(this).addClass('active');
			slider_holder.find('.slider_img li').eq(decent_number).addClass('active');
		});
		$('.slider_list_arrow').click(function(){
			var way_slide = true;
			if($(this).hasClass('slider_list_prev'))
				way_slide = false;

			var slider_holder = $(this).closest('.slider_holder'),
				count_slide = slider_holder.find('.slider_list li').length;

			if( ((slider_holder.find('.slider_list li.active').index() + 1) === count_slide || slider_holder.find('.slider_list li.active').index() < 0) && way_slide ){
				return false;
			}else{
				if(way_slide){
					slider_holder.find('.slider_list li.active').next().addClass('active');
					slider_holder.find('.slider_list li.active').eq(0).removeClass('active');

					slider_holder.find('.slider_img li.active').next().addClass('active');
					slider_holder.find('.slider_img li.active').eq(0).removeClass('active');
				}else if(!way_slide){
					slider_holder.find('.slider_list li.active').prev().addClass('active');
					slider_holder.find('.slider_list li.active').eq(1).removeClass('active');

					slider_holder.find('.slider_img li.active').prev().addClass('active');
					slider_holder.find('.slider_img li.active').eq(1).removeClass('active');
				}
			}
		});
	};

	function initTextAccordion(){
		$('.moreless_btn').click(function(){
			$(this).toggleClass('deploy');
			var hide_text = $(this).data('hide_text');
			var show_text = $(this).data('show_text');
			if ($(this).hasClass('deploy')) {
				$(this).siblings('.collapsed_text').css('height','auto');
				var _height = $(this).siblings('.collapsed_text').height();
				$(this).siblings('.collapsed_text').css('height','110px');
				$(this).siblings('.collapsed_text').addClass('deployed').animate({height:_height},300);
				$(this).text(hide_text);
			} else {
				$(this).siblings('.collapsed_text').removeClass('deployed').animate({height:'110px'},300);
				$(this).text(show_text);
			}
			return false;
		})
	};

	function initMaxHeight() {
		if (!('matchHeight' in $.fn)) return false;{
			$('.popup_holder.stock_popup .popup .stock_section .center>div').matchHeight();
			$('.price_tables>ul div').matchHeight();
			$('.gallary_lists>li .gallary_img_list li:not(.hidden)').matchHeight();
		}
	};





	$('.btn_connect').click(function(){
		var index_numb = $(this).data('connect-numb');

		$('.btn_connect_section').each(function(){
			if($(this).data('connect-numb') == index_numb && $(this).data('connect-numb') !== undefined){
				if($(this).hasClass('open')){
					$(this).slideUp();
				}else{
					$(this).slideDown();
				}
				$(this).toggleClass('open');
			}
		});
		return false;
	});
	$('.nav_holder .reservation_links_holder>a').mouseover(function(){
		if($(this).closest('.nav_holder').hasClass('fixed')){
			$(this).prev().css({'opacity' : '0'});
		}
	});
	$('.nav_holder .reservation_links_holder>a').mouseout(function(){
		if($(this).closest('.nav_holder').hasClass('fixed')){
			$(this).prev().removeAttr('style');
		}
	});

});

/* подключение плагинов */
function popUps(){
	$('[data-popup]').on('click',function(){
		var _popupUrl = $(this).data('popup');
		$('.popup_holder').removeClass('active').filter(_popupUrl).addClass('active');
		return false;
	});
	$('.popup_holder .bg,.popup_holder  .close_popup').on('click',function(){
		$('.popup_holder').removeClass('active');
		return false;
	});
};

function initSvg(_img) {
	/*
	 * Replace all SVG images with inline SVG
	 */
	_img.find('img').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	    var imgWidth = $img.attr('width');

	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgWidth) {
	            $svg = $svg.attr('width', imgWidth);
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

	});
};
