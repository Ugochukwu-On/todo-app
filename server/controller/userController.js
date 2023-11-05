const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
      const userFromRequest = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userFromRequest.password, saltRounds);
  
      // Check if the user's email is unique before creating the user
      const existingUser = await User.findOne({ email: userFromRequest.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      const newUser = new User();
      newUser.email = userFromRequest.email;
      newUser.password = hashedPassword;
  
      const createdUser = await newUser.save();
      console.log('User created successfully:', createdUser);
  
      // Generate and send a JWT token
      const token = jwt.sign({ email: createdUser.email }, SECRET_KEY, { expiresIn: '1h' });
      res.status(201).json({ user: createdUser, token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  };
    

// Controller for user login
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // If the passwords match, you can generate and return a JWT token here
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to log in' });
    }
};



module.exports = {
    createUser,
    login
  }