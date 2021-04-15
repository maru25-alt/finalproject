import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const CourserSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    department: {
      type: String,
    },
    teacherID: {
      type: String,
    },
    classes: {
      type: Array,
    },
    default: [],
  },
  { timestamps: true }
);

export default mongoose.model("courses", CourserSchema);
