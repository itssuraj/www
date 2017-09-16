$(function() {
  $.getJSON("./js/faq.json", function(json) {
    var q;
    var a;

    $.each(json, function(index, value) {
      q = "<span class='qtitle'>" + value.q + "</span>";
      a = "<p class='qdesc'>" + value.a + "</p>";

      $("#faq ul").append("<li>" + q + a + "</li>");
    });
  });
});
