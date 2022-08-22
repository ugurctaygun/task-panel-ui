import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-panel-be.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
