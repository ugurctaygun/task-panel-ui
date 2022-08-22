import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../../modules/api";
import {
  getTasksSuccess,
  createTaskSuccess,
  deleteTaskSuccess,
  updateTaskSuccess,
} from "../slices/taskSlice";

function* workGetTasksFetch() {
  const { data } = yield call(api.getAllTasks);
  yield put(getTasksSuccess(data));
}

function* workCreateTask(action) {
  let payload = action.payload;
  const { data } = yield call(api.createTask, payload);
  yield put(createTaskSuccess(data));
}

function* workDeleteTask(action) {
  let payload = action.payload;
  const { data } = yield call(api.deleteTask, payload);
  yield put(deleteTaskSuccess(data));
}

function* workUpdateTask(action) {
  let payload = action.payload;
  const { data } = yield call(api.updateTask, payload);
  yield put(updateTaskSuccess(data));
}

function* taskSaga() {
  yield takeEvery("tasks/getAllTasks", workGetTasksFetch);
  yield takeEvery("tasks/createTask", workCreateTask);
  yield takeEvery("tasks/deleteTask", workDeleteTask);
  yield takeEvery("tasks/updateTask", workUpdateTask);
}

export default taskSaga;
