import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const AttendanceSchema = new Schema(
  {
    role: {
      type: String,
    },
    userID: {
      type: String,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    startLocation: {
      type: Object,
      default: null,
    },
    endTime: {
      type: String,
      default: null,
    },
    endLocation: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("attendance", AttendanceSchema);
