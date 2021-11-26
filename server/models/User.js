import pkg from "mongoose";

const {model, Schema, ObjectId} = pkg;

const User = new Schema({
  username: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storageSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: ObjectId, ref: "File" }],
});

export default model("User", User);
