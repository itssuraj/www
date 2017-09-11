$(function() {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'API_KEY' }).base('BASE_ID');
  var validity = $('#joinForm').parsley();

  $('.request').click(function(e) {
    var name = $('input[name="name"]')[0].value;
    var email = $('input[name="email"]')[0].value;
    var portfolio = $('input[name="portfolio"]')[0].value;
    var persona = $('textarea[name="persona"]')[0].value;
    var role;
    if ($('#skillChoice1:hidden')[0].checked) {
      role = "Designer";
    } else if ($('#skillChoice2:hidden')[0].checked) {
      role = "Developer";
    } else {
      $('.radio-label').addClass("unchecked-error");

      setTimeout(function() {
        $('.radio-label').removeClass("unchecked-error");
      }, 700);
    }

    if (validity.isValid()) {
      base('Invite List').create({
        "Name": name,
        "Email": email,
        "Portfolio": portfolio,
        "Role": role,
        "Message": persona,
        "Status": "Pending"
      }, function(err, record) {
        if (err) { console.error(err); return; }
        if (record) { window.location.href = "/thank-you"; }
      });
    }
  });

  $('#joinForm').submit(function(e) {
    e.preventDefault();
  });

  $.fn.extend({
    qcss: function(css) {
      return $(this).queue(function(next) {
        $(this).css(css);
        next();
      });
    }
  });
});
