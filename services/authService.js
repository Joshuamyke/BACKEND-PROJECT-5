// JSON WEB TOKEN AUTHENTICATION 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(username, email, password) {
   const hashedPassword = await bcrypt.hash(password, 12);
   const user = new User({ username, email, password: hashedPassword });
   await user.save();
   return user;
}

async function loginUser(username, password) {
   const user = await User.findOne({ username });
   if (!user) {
      throw new Error('Invalid username or password');
   }
   const isValid = await bcrypt.compare(password, user.password);
   if (!isValid) {
      throw new Error('Invalid username or password');
   }
   const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
   return token;
}

module.exports = { registerUser, loginUser };