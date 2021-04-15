import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const FeesSchema = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    term: String,
    year: String,
    fees: Array,
  },
  { timestamps: true }
);

export default mongoose.model("fees", FeesSchema);
