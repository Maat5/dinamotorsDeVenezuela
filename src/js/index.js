var $ = require('jquery');
$('h1').html('Dinamotors de Venezuela');

$(document).ready(function(){
  var slides = document.querySelectorAll('#slides .slide');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide,2000);

  function nextSlide(){
      goToSlide(currentSlide+1);
  }

  function previousSlide(){
      goToSlide(currentSlide-1);
  }

  function goToSlide(n){
      slides[currentSlide].className = 'slide';
      currentSlide = (n+slides.length)%slides.length;
      slides[currentSlide].className = 'slide showing';
  }

  var next = document.getElementById('next');
  var previous = document.getElementById('previous');

  next.onclick = function(){
      nextSlide();
  };
  previous.onclick = function(){
      previousSlide();
  };

  $('.toggle-menu').on('click', function(){
      $('.navbar').toggle('slow');
  });

  $('.nav-link').click(function(){
    var toPage = $(this).find('a').attr('href');
    $('html, body').animate({
      scrollTop: $(toPage).offset().top
    }, 2000);
  });

  $('#sendMail').click(function() {
    var subject = $('#subject').val();
    var message = $('#message').val();
    var from = $('email').val();
    var mail = 'mailto:dinamotorsdevenezuela@gmail.com?subject=' + subject + '&body=' + message + '&from=' + from;

    $(this).attr('href', mail);

    $('#form').trigger('reset');
  });

});
