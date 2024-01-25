
const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const rawPassword = "MyBoy/2002"; 
const encodedPassword = encodeURIComponent(rawPassword);




const mongoURI = `mongodb+srv://devenzivanovic:${encodedPassword}@cluster0.ecxmiby.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    role: { type: String, default: 'user' } // 'user' or 'admin'
});

  
const User = mongoose.model('User', userSchema);










  
const app = express();

// Session configuration
app.use(session({
  secret: 'theKey', 
  resave: false,
  saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    { usernameField: 'username' }, 
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        
        if (user.disabled) {
          return done(null, false, { message: 'Account disabled.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  
  


// Middleware to handle json data
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../client')));


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('User not authenticated');
  }
  

//password endpoints
app.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in registering user');
    }
  });
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).send(info.message);
  
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.send('Logged in successfully');
      });
    })(req, res, next);
  });
  app.post('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log('Error : Failed to logout.', err);
        return res.status(500).send('Logout failed');
      }
      req.session.destroy(() => {
        res.clearCookie('connect.sid'); 
        res.status(200).send('Logged out successfully');
      });
    });
  });
  
 
  
// Endpoint to get the current user's role
app.get('/api/user/role', isAuthenticated, (req, res) => {
    if (!req.user) {
        return res.status(404).send('User not found');
    }
    // Send back the user's role
    res.json({ role: req.user.role });
});
