import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    classID: {
      type: String,
      required: true,
    },
    courseID: {
      type: String,
      required: true,
    },
    messages: {
      type: [
        {
          senderID: String,
          message: String,
          role: String,
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("coursechats", ChatSchema);
