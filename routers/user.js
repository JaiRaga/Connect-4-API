const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = new express.Router();

// Welcome Route
router.get("/", async (req, res) => {
  res.send("Hello");
});

// Create endpoint
router.post("/users", async (req, res) => {
  !req.body.name ? (req.body.name = "Player 1") : null;
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    // Should rediret to login page
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Read endpoint
// GET current user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// GET user by id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
