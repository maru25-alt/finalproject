import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    classes: [],
    courses: [],
    scholarships: [],
    campuses: [],
    sections: [],
    feesTypes: [],
    staff: [],
    academicYear: {},
    departments: [],
    academicYearsGroup: [],
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setDormitories: (state, action) => {
      state.dormitories = action.payload;
    },
    setScholarships: (state, action) => {
      state.scholarships = action.payload;
    },
    setCampuses: (state, action) => {
      state.campuses = action.payload;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    setfeesType: (state, action) => {
      state.feesTypes = action.payload;
    },
    setAcademicYear: (state, action) => {
      state.academicYear = action.payload;
    },
    setAcademicYearsGroup: (state, action) => {
      state.academicYearsGroup = action.payload;
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    setDepartments: (state, action) => {
      state.staff = action.payload;
    },
  },
});

export const {
  setAcademicYear,
  setClasses,
  setCourses,
  setDormitories,
  setScholarships,
  setCampuses,
  setDepartments,
  setSections,
  setfeesType,
  setStaff,
  setAcademicYearsGroup,
} = schoolSlice.actions;
export const selectClasses = (state) => state.school.classes;
export const selectCourses = (state) => state.school.courses;
export const selectDormitories = (state) => state.school.dormitories;
export const selectScholarship = (state) => state.school.scholarships;
export const selectCampuses = (state) => state.school.campuses;
export const selectSection = (state) => state.school.sections;
export const selectFees = (state) => state.school.feesTypes;
export const selectacademicYear = (state) => state.school.academicYear;
export const selectacademicYearsGroup = (state) =>
  state.school.academicYearsGroup;
export const selectStaff = (state) => state.school.staff;
export const selectDepartments = (state) => state.school.departments;

export default schoolSlice.reducer;
