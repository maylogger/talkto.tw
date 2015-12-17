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
    centerMode: true,
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


function polisChart() {
  if ( $('.polis-data').length != 0 ) {
    var chartItem = $('.percentage');
    for (var i = 0; i < chartItem.length; i++) {
      new Waypoint({
        element: chartItem[i],
        handler: function(direction) {
          var chart = new Chartist.Pie(this.element, {
            series: [this.element.getAttribute("data-percentage"),(100 - this.element.getAttribute("data-percentage"))]
          },{
            donut: true,
            donutWidth: 3,
            showLabel: false
          });
          chart.on('draw', function(data) {
            if(data.type === 'slice') {
              var pathLength = data.element._node.getTotalLength();
              data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
              });
              var animationDefinition = {
                'stroke-dashoffset': {
                  id: 'anim' + data.index,
                  begin: 250,
                  dur: 1500,
                  from: -pathLength + 'px',
                  to:  '0px',
                  easing: Chartist.Svg.Easing.easeOutQuint,
                  fill: 'freeze'
                }
              };
              if(data.index !== 0) {
                animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
              }
              data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
              });
              data.element.animate(animationDefinition, false);
            }
          });
          $(window).resize(function(){
            chart.off('draw');
          });
          this.disable();
        },
        offset: '95%'
      })
    }
  }
}