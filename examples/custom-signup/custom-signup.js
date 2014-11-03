$(function () {

var CONNECTION = 'Username-Password-Authentication';

$('#create-user').submit(function (event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  var userData = {};

  userData.email     = $('#create-user input[name=email]').val();
  userData.password  = $('#create-user input[name=password]').val();
  userData.color     = $('#create-user input[name=color]').val();
  userData.food      = $('#create-user input[name=food]').val();

  $.ajax({
    url: '/signup',
    type: 'POST',
    data: JSON.stringify(userData),
    contentType: 'application/json',
    dataType: 'json',
    success: function(status) {
        auth0.login({
          username: userData.email,
          password: userData.password,
          connection: CONNECTION,
          scope: 'openid profile'
        });
    },
    error: function() {
      // Show error here
    }
  });

  return false;
});

  var auth0Domain; // e.g. contoso.auth0.com
  var auth0ClientId; // e.g. DyG9nCwIEofSy66QM3oo5xU6NFs3TmvT
  var auth0CallbackUrl; // e.g. http://localhost:1337/

  if (!auth0Domain || !auth0ClientId || !auth0CallbackUrl) {
    var err = 'Make sure to fill out your Auth0 domain, client ID and callback URL in custom-signup.js';
    alert(err);
    throw new Error(err);
  }
  window.auth0 = new Auth0({
    domain: auth0domain,
    clientID: auth0cid,
    callbackURL: auth0CallbackUrl,
    callbackOnLocationHash: true
  });

  var result = auth0.parseHash(window.location.hash);
  if (result) {
    $('#user-profile .email').text(result.profile.email);
    $('#user-profile .color').text(result.profile.color);
    $('#user-profile .food').text(result.profile.food);
  }


});
