import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    enrolledCourses: [],
    allCourses: [],
  },
  reducers: {
    setEnrolledCourses: (state, action) => {
      console.log("Redux Updating Courses:", action.payload); 
      state.enrolledCourses = action.payload||[];
    },
    setAllCourses: (state, action) => {
      state.allCourses = action.payload||[];
  },
  },
});

export const { setEnrolledCourses ,setAllCourses} = courseSlice.actions;
export default courseSlice.reducer;
