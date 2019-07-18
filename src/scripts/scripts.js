const anim = lottie.loadAnimation({
  container: document.getElementById('bodymovin-wrapper'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json'
});

$("document").ready(function(){
  $('.slick-box').slick({
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 900,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '10%'
  });
});

$("document").ready(function(){
  $('.sp_slick-box').slick({
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 900,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '10%'
  });
});

$("document").ready(function(){
  $('.work_slick-box').slick({
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 900,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '10%'
  });
});

$("document").ready(function(){
  $('.pics_list').slick({
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 900,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '10%'
  });
});

$(function(){
  var slider = "#slider";
  var thumbnailItem = "#thumbnail-list .thumbnail-item";

  $(thumbnailItem).each(function(){
   var index = $(thumbnailItem).index(this);
   $(this).attr("data-index",index);
  });

  $(slider).on('init',function(slick){
   var index = $(".slide-item.slick-slide.slick-current").attr("data-slick-index");
   $(thumbnailItem+'[data-index="'+index+'"]').addClass("thumbnail-current");
  });

  $(slider).slick({
    autoplay: true,
    arrows: false,
    fade: true,
    infinite: false
  });

  $(thumbnailItem).on('click',function(){
    var index = $(this).attr("data-index");
    $(slider).slick("slickGoTo",index,false);
  });

  $(slider).on('beforeChange',function(event,slick, currentSlide,nextSlide){
    $(thumbnailItem).each(function(){
      $(this).removeClass("thumbnail-current");
    });
    $(thumbnailItem+'[data-index="'+nextSlide+'"]').addClass("thumbnail-current");
  });
});


$(document).ready(function(){
  var mouseX, mouseY;
  var ww = $( window ).width();
  var wh = $( window ).height();
  var traX, traY;
  $(document).mousemove(function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = ((4 * mouseX) / 570) + 40;
    traY = ((4 * mouseY) / 570) + 50;
    console.log(traX);
    $(".title").css({"background-position": traX + "%" + traY + "%"});
  });
});

// $(function(){
//    $('a[href^="#"]').click(function() {
//       var speed = 800;
//       var href= $(this).attr("href");
//       var target = $(href == "#" || href == "" ? 'html' : href);
//       var position = target.offset().top;
//       $('body,html').animate({scrollTop:position}, speed, 'swing');
//       return false;
//    });
// });

jQuery(document).ready(function(){
  jQuery('.parallax-layer').parallax({
      mouseport: jQuery("#port")
  });
});

$(function() {
  var h = $(window).height(); //ブラウザウィンドウの高さを取得
  $('#main-contents').css('display','none'); //初期状態ではメインコンテンツを非表示
  $('#loader-bg ,#loader').height(h).css('display','block'); //ウィンドウの高さに合わせでローディング画面を表示
});
$(window).load(function () {
  $('#loader-bg').delay(900).fadeOut(800); //$('#loader-bg').fadeOut(800);でも可
  $('#loader').delay(600).fadeOut(300); //$('#loader').fadeOut(300);でも可
  $('#main-contents').css('display', 'block'); // ページ読み込みが終わったらメインコンテンツを表示する
});

//スムーズスクロール
jQuery(function(){
  // ★　任意のズレ高さピクセル数を入力　↓
  var headerHight = 200;
   // #で始まるアンカーをクリックした場合に処理
   jQuery('a[href^=#]').click(function() {
    // スクロールの速度
    var speed = 400; // ミリ秒
    // アンカーの値取得
    var href= jQuery(this).attr("href");
    // 移動先を取得
    var target = jQuery(href == "#" || href == "" ? 'html' : href);
    // 移動先を数値で取得
    var position = target.offset().top-headerHight; // ※　-headerHightでズレの処理
    // スムーズスクロール
    jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
   });
});

