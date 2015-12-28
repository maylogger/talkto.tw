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

if ($('.bio-content').length != 0) {
  var bioContent = $('.bio-content');
  var bioContentHeight = $('.bio-content').outerHeight(true);
  if (bioContentHeight >= 250) {
    bioContent.addClass('collapse').on('click', function() {
      bioContent.removeClass('collapse').css('height', bioContentHeight);
    });
  }
}

if ( $('.title').length != 0 ) {
  $('.title').macho({ 'length': 3 });
}

function polisJSON() {
  $.getJSON(jsonDataPath, function(json){
    var i;
    var dataLength = json.length;
    var dataLoadStep = 10;
    var jsonDataIndex = dataLoadStep;
    if ( dataLength == dataLoadStep ) $('.polis-loadmore').remove();
    function addData() {
      for (i = jsonDataIndex - dataLoadStep; i < dataLength && i < jsonDataIndex; i++) {
        $('.polis-result').append(''
        +'<li class="animation"><div class="polis-content"><div class="percentage-wrap"><div class="percentage" data-percentage="' + Math.round(json[i].percentage) + '"/></div><p class="comment">' + json[i].comment_body + '</p></div></li>'
        );
      };
    };
    function polisChart() {
      var chartItem = $('.percentage');
      for (i = jsonDataIndex - dataLoadStep; i < dataLength && i < jsonDataIndex; i++) {
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
    };
    function appendPolisData() {
      addData();
      polisChart();
      jsonDataIndex = jsonDataIndex + dataLoadStep;
    };
    appendPolisData();
    $('.polis-loadmore').on('click', function(){
      if ( i < dataLength ) appendPolisData();
      if ( i >= dataLength ) $(this).remove();
    });
  });
}
$(window).load(function(){
  polisJSON();
});