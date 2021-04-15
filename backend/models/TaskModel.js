import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    teacherID: String,
    courseID: String,
    classID: String,
    score: String,
    title: String,
    description: String,
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("tasks", TaskSchema);
