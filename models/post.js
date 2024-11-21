import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    trim: true,
  },

  file: {
    public_id: String,
    url: String,
    type: String, // e.g., "pdf", "image"
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  tags: [String], // E.g., ["#jee", "#neet"], allows filtering by tags

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
