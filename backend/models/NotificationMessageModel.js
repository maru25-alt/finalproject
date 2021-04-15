import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const NotificationsSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    senderID: {
      type: String,
    },
    isSend: {
      type: Boolean,
      default: false,
    },
    messageID: {
      type: String,
    },
    userID: {
      type: String,
    },
    message: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model("newMessage", NotificationsSchema);
