import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    day: Number,
    classID: String,
    teacherID: String,
    courseID: String,
    period: Number,
    start: String,
    end: String,
  },
  { timestamps: true }
);

export default mongoose.model("timetable", TaskSchema);
