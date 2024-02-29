const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const bcryptjs = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const rawPassword = "MyBoy/2002";
const encodedPassword = encodeURIComponent(rawPassword);

const mongoURI = `mongodb+srv://devenzivanovic:${encodedPassword}@cluster0.ecxmiby.mongodb.net/LivingLearning?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

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
  userType: { type: String, default: "user" }, // 'user' or 'admin' or 'employee' or 'guardian'
  disabled: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend origin
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: "theKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Example: 24 hours
    },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "username" }, // Change this to 'email'
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username }); // Now this will correctly use the email to find the user
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        if (user.disabled) {
          return done(null, false, { message: "Account disabled." });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);

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
app.use(express.static(path.join(__dirname, "../client")));

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("User not authenticated");
}

//password endpoints
app.post("/register", async (req, res) => {
  try {
    // Extract additional fields from the request
    const {
      email,
      password,
      username,
      phone,
      birthDate,
      homeStreet,
      homeCity,
      homeState,
      homeCountry,
      homePostalCode,
      guardian,
    } = req.body;
    var role;

    if (guardian) {
      role = "guardian";
    } else {
      role = "user";
    }

    // Basic validation
    if (
      !email ||
      !password ||
      !username ||
      !phone ||
      !birthDate ||
      !homeStreet ||
      !homeCity ||
      !homeState ||
      !homeCountry ||
      !homePostalCode ||
      !role
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

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
      role,
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in registering user" });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info.message);

    req.logIn(user, (err) => {
      if (err) return next(err);
      // Include the userType in the success response
      return res.json({
        message: "Logged in successfully",
        userType: user.userType, // Adjusted to match your schema
      });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  console.log("User attempting to log out with session ID:", req.session.id); // Log the session ID
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res
          .status(500)
          .json({ message: "Error during logout", error: err.toString() });
      }
      console.log("Logout successful, attempting to destroy session.");
      // Destroy the session manually
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({
            message: "Session destruction failed",
            error: err.toString(),
          });
        }
        res.clearCookie("connect.sid", { path: "/" }); // Ensure path matches the cookie's path
        console.log("Session destroyed successfully");
        return res.status(200).json({ message: "Logged out successfully" });
      });
    });
  } else {
    console.log("No authenticated session to log out.");
    res.status(200).json({ message: "No session to log out" });
  }
});
//EVENTS SCHEMA
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);
//EVENTS CALENDAR ROUTES
app.post("/api/events", async (req, res) => {
  console.log(req.body);
  try {
    const { title, date } = req.body;
    const event = new Event({
      title,
      date,
    });
    await event.save();
    res.send({ status: "ok " });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "error creating event" });
  }
});

app.get("/api/events/find", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // Parse start and end dates from query parameters
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    // Fetch events within the specified date range
    const events = await Event.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Endpoint to get the current user's role
app.get("/api/user/role", isAuthenticated, (req, res) => {
  if (!req.user) {
    return res.status(404).send("User not found");
  }
  // Send back the user's role
  res.json({ role: req.user.role });
});

//CHATROOM ENDPOINTS & DATABASE SCHEMA
//Database
const messageSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  contents: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

//Send Message
app.post("/api/chatroom/message", async (req, res) => {
  try {
    const { owner, contents, timestamp } = req.body;
    const message = new Message({
      owner,
      contents,
      timestamp,
    });
    await message.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Retrieve all messages
app.get("/api/chatroom/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.statusStatus(500);
  }
});

app.get("/api/userinfo", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({error: 'User not authenticated'});
  }
  res.json({ username: req.user.username, userType: req.user.userType });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
