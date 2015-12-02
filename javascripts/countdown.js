var taipeiTime = moment.tz("2015-12-04 20:00", "Asia/Taipei");

$('.countdown').countdown(taipeiTime.toDate()).on('update.countdown', function(event) {
  $(this).html(event.strftime(''
    + '<div class="item"><div class="number">%D</div><div class="unit">DAYS</div></div>'
    + '<div class="colon">：</div>'
    + '<div class="item"><div class="number">%H</div><div class="unit">HOURS</div></div>'
    + '<div class="colon">：</div>'
    + '<div class="item"><div class="number">%M</div><div class="unit">MINS</div></div>'
    + '<div class="colon">：</div>'
    + '<div class="item"><div class="number">%S</div><div class="unit">SECS</div></div>'
    ));
}).on('finish.countdown', function(event){
  $('.livestream').html(''
    + '<div class="main-content video"><div class="stream"><iframe src="https://livehouse.in/embed/channel/talktotaiwan/video" frameborder="0" allowfullscreen=""></iframe></div></div>'
    + '<div class="side-content chat"><div class="chatroom"><iframe src="https://livehouse.in/embed/channel/talktotaiwan/chatroom/dark" frameborder="0" allowfullscreen=""></iframe></div></div>'
    );

});