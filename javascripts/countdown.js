var openTime = moment.tz("2015-12-04 21:00", "Asia/Taipei");
var closeTime = moment.tz("2015-12-04 21:30", "Asia/Taipei");

$('.countdown').countdown(openTime.toDate()).on('update.countdown', function(event) {
  $('.live-countdown').addClass('counting');
  $(this).html(event.strftime(''
    + '<div class="item"><div class="number">%D</div><div class="unit">DAYS</div></div>'
    + '<div class="colon">：</div>'
    + '<div class="item"><div class="number">%H</div><div class="unit">HOURS</div></div>'
    + '<div class="colon">：</div>'
    + '<div class="item"><div class="number">%M</div><div class="unit">MINS</div></div>'
    + '<div class="colon">：</div>'
    + '<div class="item"><div class="number">%S</div><div class="unit">SECS</div></div>'
  ));
  if (event.offset.hours < 1) {
    $('.livestream').html(''
      + '<div class="main-content video"><div class="stream"><iframe src="https://livehouse.in/embed/channel/talktotaiwan/video" frameborder="0" allowfullscreen=""></iframe></div></div>'
      + '<div class="side-content chat"><div class="chatroom"><iframe src="https://livehouse.in/embed/channel/talktotaiwan/chatroom/dark" frameborder="0" allowfullscreen=""></iframe></div></div>'
    );
  }
});

$('.now-program .link').countdown(closeTime.toDate()).on('update.countdown', function(event) {
  if (event.offset.hours < 1) {
    $(this).html('觀看直播 Live →');
  }
}).on('finish.countdown', function(event) {
    $(this).remove();
});
