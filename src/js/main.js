$(document).ready(function () {

  $('.header__slider').slick({
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrow slider-arrow__left" src="../img/icons/arrow-left.svg" alt="arrow">',
    nextArrow: '<img class="slider-arrow slider-arrow__right" src="../img/icons/arrow-right.svg" alt="arrow">',
    asNavFor: '.slider-dotshead'
  });

  $('.slider-dotshead').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.header__slider',
    arrows: false,
    infinite: true,

  })

  $('.surf-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,

    prevArrow: '<img class="slider-arrow slider-arrow__left" src="../img/icons/arrow-left.svg" alt="arrow">',
    nextArrow: '<img class="slider-arrow slider-arrow__right" src="../img/icons/arrow-right.svg" alt="arrow">',
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3,

        }
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,


        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,


        }
      }
    ]
  })

  $('.slider-map').slick({
    slidesToShow: 8,
    slidesToScroll: 1,

    arrows: false,
    infinite: false,
    focusOnSelect: true,
    centerMode: true,

  })

  $('.travel__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrow slider-arrow__left" src="../img/icons/arrow-left.svg" alt="arrow">',
    nextArrow: '<img class="slider-arrow slider-arrow__right" src="../img/icons/arrow-right.svg" alt="arrow">',

  })

  $('.holder__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrow slider-arrow__left" src="../img/icons/arrow-left.svg" alt="arrow">',
    nextArrow: '<img class="slider-arrow slider-arrow__right" src="../img/icons/arrow-right.svg" alt="arrow">',

  })

  $('.shop__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrow slider-arrow__left" src="../img/icons/arrow-left.svg" alt="arrow">',
    nextArrow: '<img class="slider-arrow slider-arrow__right" src="../img/icons/arrow-right.svg" alt="arrow">',

  })


  $('<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="../img/icons/plus.svg" alt="avia-logo" width="24" height="24"></div><div class="quantity-button quantity-down"><img src="../img/icons/minus.svg" alt="avia-logo" width="24" height="24"></div></div>').insertAfter('.quantity input');
  $('.quantity').each(function () {
    var spinner = $(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.quantity-up'),
      btnDown = spinner.find('.quantity-down'),
      min = input.attr('min'),
      max = input.attr('max');

    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

  });

  // Функция для расчёта цены
  function calculatePrice(slider) {
    let nights = parseInt(slider.find('.quantity__nights').val());
    let guests = parseInt(slider.find('.quantity__guest').val());
    let pricePerNight = parseFloat(slider.find('.holder-slider__info-price').data('night'));
    let pricePerGuest = parseFloat(slider.find('.holder-slider__info-price').data('guest'));

    let total = (nights * pricePerNight) + ((guests - 1) * pricePerGuest);

    slider.find('.holder-slider__info-price').text('$' + total);
  }


  $('.holder__slider-item').each(function () {
    calculatePrice($(this));
  });


  $('.quantity-button').on('click', function () {
    let slider = $(this).closest('.holder__slider-item');
    calculatePrice(slider);
  });



  $('.surfboard__circle').on('click', function () {
    $(this).toggleClass('active');
    $(this).next().toggleClass('active');
  });


  $('.menu-btn').on('click', function () {
    $('.menu').toggleClass('active');

  });

  $('.menu__link').on('click', function () {
    $('.menu').toggleClass('active');

  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      var target = document.querySelector(href);
      var offsetTop = target.offsetTop;
      console.log(offsetTop);
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    });
  });


});

import WOW from 'wow.js';

new WOW().init();



