
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const rawPassword = "MyBoy/2002"; 
const encodedPassword = encodeURIComponent(rawPassword);




const mongoURI = `mongodb+srv://devenzivanovic:${encodedPassword}@cluster0.ecxmiby.mongodb.net/LivingLearning?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Add username
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }, // Add phone number
    birthDate: { type: Date, required: true }, // Add birth date
    homeStreet: { type: String, required: true },
    homeCity: { type: String, required: true },
    homeState: { type: String, required: true },
    homeCountry: { type: String, required: true },
    homePostalCode: { type: String, required: true },
    userType: { type: String, default: 'user' }, // 'user' or 'admin' or 'employee' or 'guardian'
    disabled: { type: Boolean, default: false }
  });
  
const User = mongoose.model('User', userSchema);










  
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  credentials: true,
}));

// Session configuration
app.use(session({
  secret: 'theKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // Example: 24 hours
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: 'username' }, // Change this to 'email'
  async (username, password, done) => {
      try {
          const user = await User.findOne({ username }); // Now this will correctly use the email to find the user
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
    // Extract additional fields from the request
    const {
      email, password, username, phone, birthDate,
      homeStreet, homeCity, homeState, homeCountry, homePostalCode, guardian
    } = req.body;
    var role;

    if(guardian)
    {
      role = "guardian";
    }
    else
    {
      role = "user";
    }


    // Basic validation
    if (!email || !password || !username || !phone || !birthDate || !homeStreet || !homeCity||!homeState||!homeCountry||!homePostalCode || !role) {
      return res.status(400).json({message:'All fields are required'});
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({message:'User already exists'});
    }
    const existingEmail = await User.findOne({email})
    if (existingEmail)
    {return res.status(400).json({message :'Email already in use'})}

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with all fields
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      birthDate,
      homeStreet,
      homeCity,
      homeState,
      homeCountry,
      homePostalCode,
      role
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({message :'User registered successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Error in registering user'});
  }
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info.message);

    req.logIn(user, (err) => {
      if (err) return next(err);
      // Include the userType in the success response
      return res.json({
        message: 'Logged in successfully',
        userType: user.userType // Adjusted to match your schema
      });
    });
  })(req, res, next);
});

app.post('/logout', (req, res) => {
  console.log('User attempting to log out with session ID:', req.session.id); // Log the session ID
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Error during logout', error: err.toString() });
      }
      console.log('Logout successful, attempting to destroy session.');
      // Destroy the session manually
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
          return res.status(500).json({ message: 'Session destruction failed', error: err.toString() });
        }
        res.clearCookie('connect.sid', { path: '/' }); // Ensure path matches the cookie's path
        console.log('Session destroyed successfully');
        return res.status(200).json({ message: 'Logged out successfully' });
      });
    });
  } else {
    console.log('No authenticated session to log out.');
    res.status(200).json({ message: 'No session to log out' });
  }
});



  
 
  
// Endpoint to get the current user's role
app.get('/api/user/role', isAuthenticated, (req, res) => {
    if (!req.user) {
        return res.status(404).send('User not found');
    }
    // Send back the user's role
    res.json({ role: req.user.role });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
