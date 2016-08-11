var $ = require('jquery');
$('h1').html('Dinamotors de Venezuela');

$(document).ready(function(){

  //load header template
  $('header').load('header.html');

  //load nav menu template
  $('#nav').load('nav.html');

  //load gallery template
  $('#gallery').load('gallery.html');

  // load company template
  $('#company').load('company.html');

  //load services template
  $('#services').load('services.html');

  //load location template
  $('#location').load('location.html');

  //load contact template
  $('#contact').load('contact.html');

  //load footer template
  $('footer').load('footer.html');
});

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