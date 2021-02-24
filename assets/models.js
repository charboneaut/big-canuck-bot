import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  discId: String,
  bot: Boolean,
  lastAwake: Date,
  admin: String,
  words: Object,
  level: Number,
  exp: Number,
  pr: Number,
  expCap: Number,
  cash: Number,
  dice: Array,
});

export const User = model("User", userSchema);
