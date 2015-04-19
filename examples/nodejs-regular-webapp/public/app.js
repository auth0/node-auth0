$(document).ready(function() {
    // All these properties are set as environment variables (.env file)
    var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.showSignin({
        callbackURL: AUTH0_CALLBACK_URL,
        responseType: 'code'
      });
    });
});
