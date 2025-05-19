const jwt = require('jsonwebtoken');

const generateToken = (teacherId) => {
  return jwt.sign({ id: teacherId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
