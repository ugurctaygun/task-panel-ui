const mockData = {
  tasks: {
    "task-1": { id: "task-1", content: "Do somethins" },
    "task-2": { id: "task-2", content: "Do somethins" },
    "task-3": { id: "task-3", content: "Do somethins" },
    "task-4": { id: "task-4", content: "Do somethins" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

export default mockData;
