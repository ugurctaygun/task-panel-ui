import axios from "./axios";

export const getAllTasks = () => axios.get(`/tasks`);

export const createTask = (data) => axios.post(`/tasks`, data);

export const deleteTask = (id) => axios.delete(`/tasks/${id}`);

export const updateTask = (data) => axios.patch(`/tasks/${data._id}`, data);
