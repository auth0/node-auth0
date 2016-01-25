$(function () {

var CONNECTION = 'Username-Password-Authentication';

$('#create-user').submit(function (event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  var userData = {};
  var userForm = $('#create-user');
  userData.email     = userForm.find('input[name=email]').val();
  userData.password  = userForm.find('input[name=password]').val();
  userData.color     = userForm.find('input[name=color]').val();
  userData.food      = userForm.find('input[name=food]').val();

  $.ajax({
    url: 'http://localhost:3001/signup',
    type: 'POST',
    data: JSON.stringify(userData),
    contentType: 'application/json',
    dataType: 'json',
    success: function(status) {
      auth0.login({
        username: userData.email,
        password: userData.password,
        connection: CONNECTION,
        scope: 'openid email color food'
      });
    },
    error: function(err) {
      console.error(err);
    }
  });

  return false;
});

  window.auth0 = new Auth0({
    clientID: 'CDxL8sxaPMzl37bcQcVfS0JzdqWXFsmt',
    domain: 'contoso.auth0.com',
    callbackOnLocationHash: true,
    callbackURL: 'http://localhost:3000/'
  });

  var hash = auth0.parseHash();
  if (hash && hash.error) {
    console.error(hash.error);
  } else if (hash) {
    var profileList = $('#user-profile');
    profileList.find('.email').text(hash.profile.email);
    profileList.find('.color').text(hash.profile.color);
    profileList.find('.food').text(hash.profile.food);
  }

});
