// AUTHENTICATION ROUTE
const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
  try {
    const user = await authService.registerUser(req.body.username, req.body.email, req.body.password);
   return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
return    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await authService.loginUser(req.body.username, req.body.password);
   return res.status(200).json({message:"Login Sucessfull", token,
      user
   });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});













module.exports = router;