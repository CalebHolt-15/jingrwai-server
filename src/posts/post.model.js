import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    song: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "song",
    },
  },

  { timestamps: true }
);

export const Post = mongoose.model("post", postSchema);
