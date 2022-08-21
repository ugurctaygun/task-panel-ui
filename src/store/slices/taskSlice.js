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
      let newId = uuidv4();
      const newTaskObject = {
        id: newId,
        taskId: "#CASE-" + newId.substring(0, 4),
        title: "",
        description: "",
        points: 0,
        status: "to-do",
        deadline: null,
      };
      state.value.taskList.push(newTaskObject);
    },
    updateTask: (state, action) => {
      const { id, item, key } = action.payload;
      let selectedItem = state.value.taskList.find((item) => item.id === id);
      selectedItem[key] = item[key];
    },
  },
});

export const { updateState, createTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
