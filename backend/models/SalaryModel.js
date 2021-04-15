import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    salary: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    payments: Array,
    chequeNumber: {
      type: String,
    },
    bank: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("salary", TransactionSchema);
