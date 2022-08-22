import { Card, Typography, CardActions, Button, Box } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../../components/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { createTask, updateTask } from "../../store/slices/taskSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function BoardView() {
  const tasks = useSelector((state) => state.tasks.value);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        updateTask(
          JSON.stringify({ status: destination.droppableId }),
          draggableId
        )
      );
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
                        minHeight: 500,
                      }}
                    >
                      <Typography
                        sx={{ ml: 1, color: "rgba(0, 0, 0, 0.87)" }}
                        variant="h6"
                      >
                        To Do
                      </Typography>
                      {isLoading ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "350px",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      ) : (
                        tasks.taskList
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
                          })
                      )}
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
                        minHeight: 500,
                      }}
                    >
                      <Typography
                        sx={{ ml: 1, color: "rgba(0, 0, 0, 0.87)" }}
                        variant="h6"
                      >
                        Done
                      </Typography>
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
