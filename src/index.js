import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { loadState, saveState } from "./modules/LocalStorage";
import taskReducer from "./store/slices/taskSlice";
import { updateState } from "./store/slices/taskSlice";
import App from "./App";

const persistedState = loadState();

const store = configureStore({
  persistedState,
  reducer: {
    tasks: taskReducer,
  },
});

if (persistedState) {
  let { taskList } = persistedState.tasks.value;
  store.dispatch(
    updateState({
      taskList: taskList,
    })
  );
}

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
