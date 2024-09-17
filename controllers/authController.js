// controllers/user.js
router.post('/login', async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) 
      return res.status(400).json('Invalid email or password.');

      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid)
      return res.status(400).json('Invalid email or password.');

      const token = jwt.sign({ _id: user._id }, `${process.env.ACTIVE_TOKEN}`, { expiresIn: '1h' });
      res.send({ token });
   } catch (ex) {
     return res.status(400).json('Error logging in user.');
   }
});