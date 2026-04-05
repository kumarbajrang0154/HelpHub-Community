// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateToken = require('../utils/generateToken');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);

// Google OAuth routes
router.get('/google', (req, res, next) => {
  console.log('✅ Google OAuth route accessed');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5175/login?error=oauth_failed' }),
  (req, res) => {
    try {
      console.log('✅ Google callback received');
      console.log('✅ Authenticated user:', req.user?.email);
      
      // Generate JWT token
      const token = generateToken(req.user._id);
      console.log('✅ JWT token generated successfully');

      // Redirect to frontend with token
      const redirectUrl = `http://localhost:5175/services?token=${token}`;
      console.log('✅ Redirecting user to:', redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('❌ Google callback error:', error);
      res.redirect('http://localhost:5175/login?error=token_generation_failed');
    }
  }
);

module.exports = router;