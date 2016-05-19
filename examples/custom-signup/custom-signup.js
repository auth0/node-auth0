$(function () {

  var CONNECTION = 'Username-Password-Authentication';

  $('#create-user').submit(function (event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    var userData = {user_metadata: {}};
    userData.email = $(this).find('input[name=email]').val();
    userData.password = $(this).find('input[name=password]').val();
    userData.user_metadata.color = $(this).find('input[name=color]').val();
    userData.user_metadata.food = $(this).find('input[name=food]').val();

    console.log(userData);

    $.ajax({
      url: 'http://localhost:3001/signup',
      type: 'POST',
      data: JSON.stringify(userData),
      contentType: 'application/json',
      dataType: 'json',
      success: function (status) {
        auth0.login({
          username: userData.email,
          password: userData.password,
          connection: CONNECTION,
          scope: 'openid email color food'
        });
      },
      error: function (err) {
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
    auth0.getProfile(hash.id_token, function (err, profile) {
      var profileList = $('#user-profile');
      profileList.find('.email').text(profile.email);
      profileList.find('.color').text(profile.user_metadata.color);
      profileList.find('.food').text(profile.user_metadata.food);
    });
  }

});
