$(function() {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'API_KEY' }).base('BASE_ID');
  var validity = $('#joinForm').parsley();
  
  var name;
  var email;
  var portfolio;
  var persona;
  var role;

  $('.request').click(function(e) {
    checkValidation(name, $('input[name="name"]'), 'input-error');
    checkValidation(email, $('input[name="email"]'), 'input-error');
    checkValidation(portfolio, $('input[name="portfolio"]'), 'input-error');
    checkValidation(persona, $('textarea[name="persona"]'), 'input-error');

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

  function checkValidation(variable, element, klass) {
    if ($(element).parsley().isValid()) {
      variable = $(element)[0].value;
    } else {
      element.addClass(klass);

      setTimeout(function() {
        element.removeClass(klass);
      }, 700);
    }
  }

  $.fn.extend({
    qcss: function(css) {
      return $(this).queue(function(next) {
        $(this).css(css);
        next();
      });
    }
  });
});
