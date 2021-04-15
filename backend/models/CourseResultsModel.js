import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const SBASchema = new Schema(
  {
    classID: {
      type: String,
      required: true,
    },
    courseID: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    taskID: {
      type: String,
    },
    term: {
      type: String,
    },
    score: {
      type: Number,
    },
    students: {
      type: [
        {
          name: String,
          userID: String,
          position: String,
          score: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("courseresults", SBASchema);
