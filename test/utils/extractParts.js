module.exports = function (body, boundary) {
  var partRegexp = new RegExp(boundary + '[-]{2}|' + boundary, 'g');
  var parts = {};
  var name;
  var value;

  body
    .split(partRegexp)
    .forEach(function (part) {
      // Ignore empty strings in the array.
      if (part.length === 0) return;

      name = part.match(/name="([^"]*)"/)[1];
      value = part.split('"' + name + '"')[1];

      parts[name] = value;
    });

  return parts;
};
