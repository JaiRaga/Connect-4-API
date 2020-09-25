const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const gameRouter = require("./routers/game");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", gameRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
