import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    value: {
      taskList: [],
    },
  },
  reducers: {
    updateState: (state, action) => {
      state.value = { ...action.payload };
    },
    createTask: (state, action) => {
      const newTaskObject = {
        id: uuidv4(),
        taskId: action.payload,
        title: "",
        description: "",
        points: 0,
        status: false,
      };
      state.value.taskList.push(newTaskObject);
    },
  },
});

export const { updateState, createTask } = taskSlice.actions;

export default taskSlice.reducer;
