exports.required = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

exports.redirectIfAuth = function(path) {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect(path);
    }
    next();
  }
}

