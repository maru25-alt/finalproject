import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const AcademicYearSchema = new Schema(
  {
    year: {
      type: Array,
    },
    term: {
      type: Array,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("academicYear", AcademicYearSchema);
