const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    age : Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret._id;
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;