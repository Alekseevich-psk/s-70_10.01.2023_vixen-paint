$(() => {
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Производство
	if ($('#production_slider1').length) {
		new Swiper('#production_slider1', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.production1-swiper-button-next',
				prevEl: '.production1-swiper-button-prev'
			}
		})
	}

	if ($('#production_slider2').length) {
		new Swiper('#production_slider2', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.production2-swiper-button-next',
				prevEl: '.production2-swiper-button-prev'
			}
		})
	}


	// Категории
	let categoriesSliders = []

	$('.categories .swiper-container').each(function (i) {
		let slides = $(this).find('.slide').length,
			this_ID = $(this).attr('id'),
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: false,
				noSwiping: true,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						spaceBetween: 16,
						slidesPerView: 2
					},
					768: {
						spaceBetween: 20,
						slidesPerView: 3
					},
					1024: {
						spaceBetween: 20,
						slidesPerView: 4
					},
					1280: {
						spaceBetween: 24,
						slidesPerView: 4
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.category'))
						})
					},
					resize: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.category'))
						})
					}
				}
			}

		categoriesSliders[i] = new Swiper('#' + this_ID, options)

		if (slides > categoriesSliders[i].params.slidesPerView) {
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			categoriesSliders[i].destroy(true, true)
			categoriesSliders[i] = new Swiper('#' + this_ID, options)
		}
	})


	// Товары
	const productsSliders = []

	$('.products .swiper-container').each(function (i) {
		let slides = $(this).find('.slide').length,
			this_ID = $(this).attr('id'),
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: false,
				noSwiping: true,
				spaceBetween: 0,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					480: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3
					},
					1024: {
						slidesPerView: 2
					},
					1280: {
						slidesPerView: 3
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
						})
					},
					resize: swiper => {
						setTimeout(() => {
							productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
						})
					}
				}
			}

		productsSliders[i] = new Swiper('#' + this_ID, options)

		if (slides > productsSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			productsSliders[i].destroy(true, true)
			productsSliders[i] = new Swiper('#' + this_ID, options)
		}
	})


	// Страница товара
	if ($('.product_info .images').length) {
		let images = $('.product_info .images')

		const productSlider = new Swiper('.product_info .images .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						images.find('.thumbs button').removeClass('active')
						images.find('.thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		images.find('.thumbs button').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Страница товара - Обьёмы (Цвета)
	$('.product_info .volume .head .arrow').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.volume')

		!$(this).hasClass('active')
			? parent.find('.colors > *.hide').slideDown(300)
			: parent.find('.colors > *.hide').slideUp(200)

		$(this).toggleClass('active')
	})


	// Страница товара - Где купить?
	$('.product_info .where_buy .head .arrow').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.where_buy')

		!$(this).hasClass('active')
			? parent.find('.row > *.hide').slideDown(300)
			: parent.find('.row > *.hide').slideUp(200)

		$(this).toggleClass('active')
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Фильтр
	$('.mob_filter_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})
})



$(window).on('load', () => {
	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header:not(.absolute)').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	if (WW != $(window).width()) {
		// Фикс. шапка
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > headerHeight
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)


		// Выравнивание элементов в сетке
		$('.products .row').each(function () {
			productHeight($(this), parseInt($(this).css('--products_count')))
		})
	}
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name, .desc').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))
		setHeight($products.slice(start, finish).find('.desc'))

		start = start + step
		finish = finish + step
	})
}