if ($('.program-slider').length != 0) {
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    centerMode: false,
    centerPadding: '0px',
    infinite: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });
}

if ($('#polis-link').length != 0) {
  $('#polis-link').on('click',function (e) {
    e.preventDefault();

    var target = this.hash,
    $target = $(target);
    var targetScrollTop = $target.offset().top;

    $('html, body').stop().animate({
        'scrollTop': targetScrollTop
    }, 500, 'swing');
  });
}