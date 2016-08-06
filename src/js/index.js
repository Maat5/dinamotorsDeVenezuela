var $ = require('jquery');
$('h1').html('Dinamotors de Venezuela');

$(document).ready(function(){

  //load header template
  $('header').load('header.html');

  //load nav menu template
  $('#nav').load('nav.html');

  //load gallery template
  $('#gallery').load('gallery.html');

  //load services template
  $('#services').load('services.html');

  //load contact template
  $('#contact').load('contact.html');

  //load footer template
  $('footer').load('footer.html');
});
