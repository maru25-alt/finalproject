import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const TeacherSchema = new Schema(
  {
    userID: String,
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    title: {
      type: String,
    },
    email: {
      type: String,
    },
    physicalAddress: {
      type: String,
    },
    postalAddress: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    dateofBirth: {
      type: String,
    },
    placeofBirth: {
      type: String,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
      default: "teacher",
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
    position: {
      type: String,
    },
    telephone: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    classID: {
      type: String,
    },
    courses: {
      type: Array,
      default: [],
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
    profileUrl: {
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

export default mongoose.model("teachers", TeacherSchema, "accounts");
