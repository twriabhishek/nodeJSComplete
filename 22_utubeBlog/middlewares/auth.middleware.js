const { getUser } = require("../utils/auth.utils");

const checkForAuthentication = (req, res, next) => {
  const tokenCookieValue = req.cookies.token;
  if (!tokenCookieValue) {
    return next();
  }

  try {
    const user = getUser(tokenCookieValue);
    req.user = user;
  } catch (error) {}

  return next();
};

module.exports = { checkForAuthentication };