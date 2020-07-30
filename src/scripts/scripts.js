
// loading

  $(function() {
    var h = $(window).height();
    
    $('#wrap').css('display','none');
    $('#loader-bg ,#loader').height(h).css('display','block');
  });
    
  $(window).load(function () {
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);
    $('#wrap').css('display', 'block');
  });
    
  $(function(){
    setTimeout('stopload()',10000);
  });
    
  function stopload(){
    $('#wrap').css('display','block');
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);
  }

// Cursor

  const stalker = document.createElement('div'); 
  stalker.id = 'cursor';
  document.body.appendChild(stalker);   

  const stalker2 = document.createElement('div'); 
  stalker2.id = 'follower';
  document.body.appendChild(stalker2);   


  var
  cursor = $("#cursor"),
  follower = $("#follower"),
  cWidth = 8,
  fWidth = 40,
  delay = 10,
  mouseX = 0,
  mouseY = 0,
  posX = 0,
  posY = 0;

  TweenMax.to({}, .001, {
    repeat: -1,
    onRepeat: function() {
      posX += (mouseX - posX) / delay;
      posY += (mouseY - posY) / delay;

      TweenMax.set(follower, {
          css: {    
            top: posY - (fWidth / 1),
            left: posX - (fWidth / 1)
          }
      });

      TweenMax.set(cursor, {
          css: {    
            top: mouseY - (cWidth / 1),
            left: mouseX - (cWidth / 1)
          }
      });
    }
  });

  $(document).on("mousemove", function(e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
  });
