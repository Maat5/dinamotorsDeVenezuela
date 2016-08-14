var $ = require('jquery');
$('h1').html('Dinamotors de Venezuela');

$(document).ready(function(){
  var slides = document.querySelectorAll('#slides .slide');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide,4000);

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

  $('#form').on('submit', function(event) {
    var subject = $('#subject').val();
    var message = $('#message').val();
    var from = $('#email').val();
    var mail = 'mailto:dinamotorsdevenezuela@gmail.com?body=' + message + '&subject=' + subject+ '&cc=' + from;
    $('#form').attr("action", mail);
    setTimeout(function() {
      $('#form').trigger('reset');
    }, 1000);
  });

});
