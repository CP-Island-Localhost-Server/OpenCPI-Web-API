const jsonWebToken = require("jsonwebtoken")
const crypto = require('crypto');

function generateJwtToken(user_id, email) {
  return jsonWebToken.sign({
    uid: user_id,
    email: email
  }, process.env.SECRET_JWT, { expiresIn: "1h" });
}

function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

module.exports = { generateJwtToken, generateRefreshToken }