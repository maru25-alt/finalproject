import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const NotificationsSchema = new Schema(
  {
    senderID: {
      type: String,
    },
    message: {
      type: String,
    },
    userID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notifications", NotificationsSchema);
