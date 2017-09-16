$(function() {
  $('a[href^="#"]:not([href="#"])').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 50
    }, 750, 'swing');
  });

  $.getJSON("./js/faq.json", function(json) {
    var q;
    var a;

    $.each(json, function(index, value) {
      q = "<span class='qtitle'>" + value.q + "</span>";
      a = "<p class='qdesc'>" + value.a + "</p>";

      $("#faq .questions ul").append("<li>" + q + a + "</li>");
    });
  });
});
