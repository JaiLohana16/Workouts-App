const jwt = require('jsonwebtoken');
const User = require("\\MERN STACK\\backend\\models\\User.js");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
      // Finding user by id and excluding password
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  } 
};

module.exports = protect;
