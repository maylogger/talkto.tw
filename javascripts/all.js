// slider 設定，文件可參考 http://kenwheeler.github.io/slick/

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

// 開播前 polis 按鈕的平滑 scroll

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

// archive 頁面來賓介紹若超越250高會摺疊的 js

if ($('.bio-content').length != 0) {
  var bioContent = $('.bio-content');
  var bioContentHeight = $('.bio-content').outerHeight(true);
  if (bioContentHeight >= 250) {
    bioContent.addClass('collapse').on('click', function() {
      bioContent.removeClass('collapse').css('height', bioContentHeight);
    });
  }
}

// 處理標題斷行漏字的問題

if ( $('.title').length != 0 ) {
  $('.title').macho({ 'length': 3 });
}

// archive 頁面 polis 統計資料的 function

function polisJSON() {
  // json 檔案讀取，路徑寫在各 archive 頁面
  $.getJSON(jsonDataPath, function(json){
    var i;
    var dataLength = json.length;
    var dataLoadStep = 10;
    var dataLoadButton = $('.polis-loadmore');
    var jsonDataIndex = dataLoadStep;
    if ( dataLoadStep >= dataLength ) dataLoadButton.remove();
    // 將文字資料到進 .polis-result 裡
    function addData() {
      for (i = jsonDataIndex - dataLoadStep; i < dataLength && i < jsonDataIndex; i++) {
        $('.polis-result').append(''
        +'<li class="animation"><div class="polis-content"><div class="percentage-wrap"><div class="percentage" data-percentage="' + Math.round(json[i].percentage) + '"/></div><p class="comment">' + json[i].comment_body + '</p></div></li>'
        );
      };
    };
    // 讀取剛剛到好的文字資料中的 data-percentage，取得數值後畫 pie 圖
    // 偵測 scroll 事件觸發畫圖使用 waypoints.js，文件可參考 http://imakewebthings.com/waypoints/
    // 畫圖使用 chartist.js，文件可參考 https://gionkunz.github.io/chartist-js/
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
    // 執行上面兩個 function，並累加 DataIndex
    function appendPolisData() {
      addData();
      polisChart();
      jsonDataIndex = jsonDataIndex + dataLoadStep;
    };
    appendPolisData();
    // 偵測若資料已全部讀完，移除讀取按鈕
    dataLoadButton.on('click', function(){
      if ( i < dataLength ) appendPolisData();
      if ( i >= dataLength ) $(this).remove();
    });
  });
}
$(window).load(function(){
  if ($('.polis-result').length != 0) polisJSON();
});