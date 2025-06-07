import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: String,
  content: String,
  theme: String,
  status: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default model("Note", noteSchema);
