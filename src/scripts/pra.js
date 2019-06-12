$(function() {
  $('.diary').slick({
    arrows: true,
    slidesToShow:3,
    centerMode:true,
    prevArrow:'<div class="prev">PREV</div>',
    nextArrow:'<div class="next">NEXT</div>'
  });
});

$(function() {
  $.fn.extend({
    animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
      return this;
    }
  });
  $('.goods_1').on('click',function(){
    $('.goods_1').animateCss('jello');
  });
  $('.goods_2').on('click',function(){
    $('.goods_2').animateCss('rubberBand');
  });
  $('.goods_3').on('click',function(){
    $('.goods_3').animateCss('hinge');
  });
});


$(function() {
    var topBtn = $('#page-top');
    topBtn.hide();
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
});
$(function(){
    $('.contents00').each(function(i, elem){
        var contentsPOS = $(elem).offset().top;
        $(window).on('load scroll resize', function(){
            var winHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var showClass = 'show';
            var timing = 100; // 100pxコンテンツが見えたら次のif文がtrue
            if (scrollTop >= contentsPOS - winHeight + timing){
              $(elem).addClass(showClass);
            } else {
              $(elem).removeClass(showClass);
            }
        });
    });
});

