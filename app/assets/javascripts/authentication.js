var app = app || {};

var webAuth = new Auth0({
  domain: 'steve-goldman.auth0.com',
  clientID: 'aC0nb2KcExZ15grw005SxGgDMvihBC3i',
  callbackURL: 'http://localhost:3000',
  responseType: 'token',
  scope: 'openid'
});

var loginBtn;
var logoutBtn;
var loginStatus;

function isAuthenticated() {
  return localStorage.getItem('id_token');
};

function setSession(authResult) {
  var expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
};

function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  displayButtons();
};

function handleAuthentication() {
  var authResult = webAuth.parseHash(window.location.hash);
  if (authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = '';
      setSession(authResult);
    }
  }
  displayButtons();
};

function displayButtons() {
  if (isAuthenticated()) {
    loginBtn.css('display', 'none');
    logoutBtn.css('display', 'inline-block');
    loginStatus.text('Logged In!');
  } else {
    loginBtn.css('display', 'inline-block');
    logoutBtn.css('display', 'none');
    loginStatus.text('Not Logged In');
  }
}

app.Auth = {
  initialize: function() {
    loginBtn = $('#btn-login');
    logoutBtn = $('#btn-logout');
    loginStatus = $('#login-status');
    loginBtn.click(function(e) {
      e.preventDefault();
      webAuth.login({ sso: true });
    });
    logoutBtn.click(logout);
    handleAuthentication();
  },

  authenticated: isAuthenticated,

  authorizationHeader: function() {
    return 'Bearer '.concat(localStorage.getItem('id_token'));
  }
};

$('document').ready(function() {
  app.Auth.initialize();
  if (!app.Auth.authenticated()) {
    window.location = 'http://localhost:3000/login';
  } else {
    app.Router = new StupodRouter();
    Backbone.history.start();
  }
});
