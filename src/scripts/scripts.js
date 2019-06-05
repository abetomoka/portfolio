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

jQuery(document).ready(function(){
  jQuery('.parallax-layer').parallax({
      mouseport: jQuery("#port")
  });
});

