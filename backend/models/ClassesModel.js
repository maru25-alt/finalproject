import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const ClassesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacherID: {
      type: String,
    },
    classCode: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
    },
    prefect: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("classes", ClassesSchema);
