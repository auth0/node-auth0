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
        widget.getClient().login({
          username: userData.email,
          password: userData.password,
          connection: CONNECTION});
    },
    error: function() {
      // Show error here
    }
  });

  return false;
});

  window.widget = new Auth0Widget({
    domain:                     'contoso.auth0.com',                // your domain
    clientID:                   'DyG9nCwIEofSy66QM3oo5xU6NFs3TmvT', // your clientID
    callbackURL:                'http://localhost:1337/',           // your callbackURL
    callbackOnLocationHash:     true,
    enableReturnUserExperience: false
  });

  widget.parseHash(window.location.hash, function (profile, id_token, access_token, state) {
    $('#user-profile .email').text(profile.email);
    $('#user-profile .color').text(profile.color);
    $('#user-profile .food').text(profile.food);
  });


});
