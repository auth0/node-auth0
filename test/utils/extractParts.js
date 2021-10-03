module.exports = function (body, boundary) {
  const partRegexp = new RegExp(`${boundary}[-]{2}|${boundary}`, 'g');
  const parts = {};

  body.split(partRegexp).forEach((part) => {
    // Ignore empty strings in the array.
    if (part.trim().length === 0) return;

    const [, name] = part.match(/name="([^"]*)"/);
    const [, value] = part.split(`"${name}"`);

    parts[name] = value.trim();
  });

  return parts;
};
