import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    userID: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    dateofBirth: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
    placeOfBirth: {
      type: String,
    },
    email: {
      type: String,
    },
    position: String,
    middleName: {
      type: String,
    },
    physicalAddress: {
      type: String,
    },
    postalAddress: {
      type: String,
    },
    dormitoryID: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    status: {
      type: String,
      //border or day scholar
    },
    fees: {
      type: String,
    },
    scholarship: {
      type: String,
    },
    telephone: {
      type: String,
    },
    mobilenumber: {
      type: String,
    },
    classID: {
      type: String,
    },
    courses: {
      type: [
        {
          courseID: String,
        },
      ],
    },
    guadian: {
      type: [
        {
          id: String,
          relationship: String,
          occupation: String,
          name: String,
          email: String,
          mobile: String,
          address: String,
          lastname: String,
        },
      ],
    },
    campusID: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    grade: {
      type: String,
    },
    lastSchool: {
      type: {
        school: String,
        reason: String,
      },
    },
    password: {
      type: String,
      required: true,
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
    section: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("students", StudentSchema, "accounts");
