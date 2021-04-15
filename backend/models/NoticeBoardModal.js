import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const NotificationsSchema = new Schema(
  {
    createdBy: {
      type: String,
    },
    date: {
      type: Date,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notice", NotificationsSchema);
