import { Card, Typography, CardActions, Button, Box } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../../components/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { createTask, updateTask } from "../../store/slices/taskSlice";
import { toast } from "react-toastify";

export default function BoardView() {
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      let jsonObject = {
        status: destination.droppableId,
        _id: draggableId,
      };
      dispatch(updateTask(jsonObject));
    }
  };

  const handleAddTask = () => {
    const newTaskObject = {
      title: "",
      description: "",
      points: 0,
      status: "to-do",
      deadline: null,
    };
    dispatch(createTask(newTaskObject));
    toast.success("Added Task !", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          height: "100%",
          overflow: "auto",
        }}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "15px" }}>
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
                        minHeight: 650,
                      }}
                    >
                      <Typography
                        sx={{ ml: 1, color: "rgba(0, 0, 0, 0.87)" }}
                        variant="h6"
                      >
                        To Do
                      </Typography>
                      <Box sx={{ maxHeight: "580px", overflow: "auto" }}>
                        {tasks.taskList
                          .filter((task) => task.status === "to-do")
                          .map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
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
                                        content={item}
                                        isDragging={snapshot.isDragging}
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                      </Box>

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
              marginLeft: "15px",
            }}
          >
            <div>
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
                        minHeight: 650,
                      }}
                    >
                      <Typography
                        sx={{ ml: 1, color: "rgba(0, 0, 0, 0.87)" }}
                        variant="h6"
                      >
                        Done
                      </Typography>
                      <Box sx={{ maxHeight: "580px", overflow: "auto" }}>
                        {tasks.taskList
                          .filter((task) => task.status === "done")
                          .map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
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
                                        content={item}
                                        isDragging={snapshot.isDragging}
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                      </Box>

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
