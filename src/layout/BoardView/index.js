import { Card, Typography, CardActions, Button } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../../components/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { createTask, updateState } from "../../store/slices/taskSlice";

export default function BoardView() {
  const tasks = useSelector((state) => state.tasks.value);
  console.log(tasks);
  const dispatch = useDispatch();

  const itemsFromBackend = [
    { id: "task-1", content: "First task" },
    { id: "task-2", content: "Second task" },
    { id: "3", content: "Third task" },
    { id: "4", content: "Fourth task" },
    { id: "5", content: "Fifth task" },
  ];

  const columnsFromBackend = {
    "To Do": {
      name: "To do",
      items:
        tasks.taskList.length > 0
          ? tasks.taskList.filter((item) => item.status === true)
          : [],
      editable: true,
    },
    Done: {
      name: "Done",
      items:
        tasks.taskList.length > 0
          ? tasks.taskList.filter((item) => item.status === false)
          : [],
      editable: false,
    },
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  const handleAddTask = () => {
    dispatch(createTask("test"));
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "start", height: "100%" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ margin: 8 }}>
              <Droppable droppableId={"to-do"}>
                {(provided, snapshot) => {
                  return (
                    <Card
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "#ebecf0",
                        padding: 6,
                        width: 350,
                        minHeight: 500,
                      }}
                    >
                      <Typography
                        sx={{ ml: 1, color: "text.primary" }}
                        variant="h6"
                      >
                        To Do
                      </Typography>
                      {tasks.taskList.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard
                                    content={item.content}
                                    isDragging={snapshot.isDragging}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      <CardActions>
                        <Button
                          onClick={handleAddTask}
                          variant="contained"
                          size="small"
                        >
                          Add New Task
                        </Button>
                      </CardActions>
                    </Card>
                  );
                }}
              </Droppable>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ margin: 8 }}>
              <Droppable droppableId={"done"}>
                {(provided, snapshot) => {
                  return (
                    <Card
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "#ebecf0",
                        padding: 6,
                        width: 350,
                        minHeight: 500,
                      }}
                    >
                      <Typography
                        sx={{ ml: 1, color: "text.primary" }}
                        variant="h6"
                      >
                        Done
                      </Typography>
                      {tasks.taskList.map((item, index) => {
                        if (item.status) {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskCard
                                      content={item.content}
                                      isDragging={snapshot.isDragging}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                    </Card>
                  );
                }}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
