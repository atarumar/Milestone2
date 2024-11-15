const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const { PrismaClient } = require('@prisma/client');


const app = express();
const prisma = new PrismaClient();
const port = 3000;

// Serve static files from "Milestone1" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(
  session({
    secret: 'your_session_secret', // replace with a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

// Serve the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/passchecker', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'passchecker.html'));
});

app.get('/privacy-puzzle', (req, res) => {    
  const session = req.session;
  if (session.userId) {
      res.sendFile(path.join(__dirname, 'public', 'html', 'sortable-list.html'));
  } else {
      res.redirect("/auth");
  }
});

app.get('/ethics-puzzle', (req, res) => {
  const session = req.session;
  if (session.userId) {
      res.sendFile(path.join(__dirname, 'public', 'html', 'memcard.html'));
  } else {
      res.redirect("/auth");
  }
});


app.get("/getEthicsState", async (req, res) => {
  try {
      // Retrieve the user's ethicsState based on the user ID in the session
      const user = await prisma.user.findUnique({
          where: { id: req.session.userId },
          select: { ethicsState: true }, // Only select the ethicsState field
      });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json({ ethicsState: user.ethicsState });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving ethics state" });
  }
});


app.post("/updateEthicsState", async (req, res) => {
  const { saveCur } = req.body;

  try {
      // Update the ethicsState in the database
      const updatedState = await prisma.user.update({
          where: { id: req.session.userId }, 
          data: { ethicsState: saveCur },
      });

      res.status(200).json({ message: "Ethics state updated successfully", updatedState });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating ethics state" });
  }
});


app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'sign-in.html'));
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
          data: { email, password: hashedPassword },
      });

      res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during registration" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      req.session.userId = user.id;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await prisma.session.create({
          data: { userId: user.id, expiresAt, data: {} },
      });

      res.json({ message: "Login successful", user: { id: user.id, email: user.email } });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during login" });
  }
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

export default app;