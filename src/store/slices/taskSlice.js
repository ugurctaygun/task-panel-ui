import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    value: {
      taskList: [],
    },
    isLoading: true,
  },
  reducers: {
    getAllTasks: (state) => {},
    getTasksSuccess: (state, action) => {
      state.value.taskList = action.payload;
      state.isLoading = false;
    },
    updateState: (state, action) => {
      state.value = { ...action.payload };
    },
    createTask: (state, action) => {
      state.isLoading = true;
    },
    createTaskSuccess: (state, action) => {
      state.isLoading = false;
    },
    updateTask: (state, action) => {
      state.isLoading = true;
    },
    updateTaskSuccess: (state, action) => {
      state.isLoading = false;
    },
    deleteTask: (state, action) => {
      state.isLoading = true;
    },
    deleteTaskSuccess: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  getAllTasks,
  getTasksSuccess,
  updateState,
  createTask,
  createTaskSuccess,
  updateTask,
  updateTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;
