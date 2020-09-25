const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "taskAppToken");
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (name) => {
  const user = await User.findOne({ name });

  if (!user) {
    throw new Error("Unable to login");
  }

  return user;
};

// userSchema.pre("save", async function (next) {
//   const user = this;

//   next();
// });

// userSchema.pre("remove", async function (next) {
//   const user = this;

//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
