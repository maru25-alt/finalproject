import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const ActivitiesSchema = new Schema(
  {
    activity: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("activities", ActivitiesSchema);
