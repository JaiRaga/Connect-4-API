const express = require("express");
const User = require("../models/User");
const Game = require("../models/Game");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/START", auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user._id);
    const game = await Game.findOneAndUpdate(
      { owner: req.user._id },
      { player: [], opponent: [] }
    );

    res.send(game);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/col/:col", auth, async (req, res) => {
  const column = parseInt(req.params.col);

  try {
    // console.log(1);
    if (column > 6) return res.send("Invalid");
    let game = await Game.findOne({ owner: req.user._id });
    // console.log(2);
    if (!game) {
      game = new Game({
        owner: req.user._id
      });
    }
    // console.log(3);
    game.player.push(column);
    // console.log(4);
    await game.save();
    // console.log(5);
    res.send(game);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
