const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    player: [Number],
    opponent: [Number],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

gameSchema.pre("save", async function (next) {
  const game = this;

  let player = game.player;
  let opponent = game.opponent;

  console.log("************", player.length);
  player.length !== 0
    ? game.opponent.push(Math.floor(Math.random() * Math.floor(7)))
    : null;

  let count1 = 1,
    count2 = 1,
    c1 = 1,
    c2 = 1,
    curr = 0,
    prev = 0,
    cur = 0,
    pre = 0;

  // find if the coins are adjacent
  player.forEach((num, ind) => {
    if (ind !== 0) {
      prev = curr;
      curr = num;
      prev + 1 === curr ? (count1 += 1) : (count1 = 1);
    }
    curr = num;
    // console.log("player1 1", count1);

    if (count1 === 4) console.log("Success 1");
  });

  // find if coins are stacked
  player.forEach((num, ind) => {
    if (ind !== 0) {
      prev = curr;
      curr = num;
      prev === curr ? (count2 += 1) : (count2 = 1);
    }
    curr = num;
    // console.log("palyer1 2", count2);

    if (count2 === 4) console.log("Success 2");
  });

  opponent.forEach((num, ind) => {
    if (ind !== 0) {
      pre = cur;
      cur = num;
      pre + 1 === cur ? (c1 += 1) : (c1 = 1);
    }
    cur = num;
    // console.log("player2 1", c1);

    if (c1 === 4) console.log("Success 1");
  });

  // find if coins are stacked
  opponent.forEach((num, ind) => {
    if (ind !== 0) {
      pre = cur;
      cur = num;
      pre === cur ? (c2 += 1) : (c2 = 1);
    }
    cur = num;
    // console.log("player2 2", c2);

    if (c2 === 4) console.log("Success 2");
  });

  count1 = 1;
  count2 = 1;
  c1 = 1;
  c2 = 1;

  next();
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
