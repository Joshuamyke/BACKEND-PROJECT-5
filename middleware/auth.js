// JSOWEBTOKEN AUTHENTICATION
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
   try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.user = decoded;
      next();
   } catch (error) {
    return  res.status(401).json({ message: 'Unauthorized Acess Denied!' });
   }
};

module.exports = authenticate;