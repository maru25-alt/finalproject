import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const NonTeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    nextofKin: {
      type: {
        relationship: String,
        occupation: String,
        name: String,
        email: String,
        mobile: String,
        address: String,
        lastname: String,
      },
    },
    role: {
      type: String,
      default: "nonteacher",
    },
    telephone: {
      type: String,
    },
    position: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nextofKin_ID: {
      type: String,
    },
    qualifiations: {
      type: String,
    },
    bank: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    profileUrl: String,
    userID: {
      type: String,
    },
    health: {
      type: String,
    },
    allege: {
      type: String,
    },
    disease: {
      type: String,
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("nonTeachers", NonTeacherSchema, "accounts");
