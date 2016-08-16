var $ = require('jquery');

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

  window.sr = ScrollReveal({ reset: true });

  sr.reveal(".social-effect", {
      duration : 600,
      mobile   : true,
      scale    : 0.3
  }, 150);

  sr.reveal('.services-dm', {
    duration : 1000,
    scale    : 0.5,
    distance : "10px",
    mobile   : true
  }, 200);

  sr.reveal('.right-effect', {
    delay    : 200,
    scale    : 0.5,
    distance : "30px",
    mobile   : true,
    origin   : "right"
  }, 150);

  sr.reveal('.left-effect', {
    delay    : 200,
    scale    : 0.5,
    distance : "30px",
    mobile   : true,
    origin   : "left"
  }, 150);

  sr.reveal('.contact-dm', {
    duration : 1000,
    scale    : 0.5,
    distance : "10px",
    mobile   : true,
    origin   : "left"
  }, 100);

  sr.reveal('.contact-forms', {
    duration : 1000,
    scale    : 0.5,
    distance : "10px",
    mobile   : true,
    origin   : "right"
  }, 100);

  sr.reveal('.titles', {
    duration : 1000,
    scale    : 0.5,
    distance : "10px",
    origin   : "top",
    mobile   : true
  }, 150);

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
