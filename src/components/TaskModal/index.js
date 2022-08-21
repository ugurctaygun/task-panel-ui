import Box from "@mui/material/Box";
import { MenuItem, FormControl, Tooltip } from "@material-ui/core";
import {
  InputBase,
  Select,
  InputLabel,
  TextField,
  Modal,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import useStyles from "./style";
import ErrorIcon from "@mui/icons-material/Error";
import DatePicker from "../DatePicker";
import { updateTask, deleteTask } from "../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActionMenu from "../ActionMenu";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  color: "text.primary",
};

export default function TaskModal() {
  let { id } = useParams();
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState({
    id: "",
    taskId: "",
    title: "",
    description: "",
    points: 0,
    status: "to-do",
    deadline: null,
  });
  useEffect(() => {
    let task = tasks.taskList.filter((item) => item.taskId === id);
    if (task.length > 0) {
      setContent(task[0]);
      setModalOpen(true);
    }
  }, [tasks.taskList, id]);
  const handleModalClose = () => {
    navigate("/");
  };
  const handleDelete = () => {
    dispatch(deleteTask({ id: content.id }));
    navigate("/");
  };
  const updateItemOnChange = (data, key) => {
    dispatch(updateTask({ id: content.id, item: data, key }));
  };
  const deadlineHandler = (data) => {
    updateItemOnChange({ deadline: data }, "deadline");
  };
  return (
    <>
      <div>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">Title</Typography>
                <ActionMenu handleDelete={handleDelete} />
              </Grid>

              <InputBase
                style={{
                  width: "100%",
                  fontSize: "22px",
                }}
                sx={{ color: "text.primary" }}
                placeholder="Enter Title &#x270E;"
                inputProps={{
                  "aria-label": "Title",
                }}
                onChange={(event) =>
                  updateItemOnChange({ title: event.target.value }, "title")
                }
                value={content.title}
              />
              <Divider />
            </Grid>

            <FormControl className={classes.formControl}>
              <InputLabel sx={{ mr: "5px" }}>Points :</InputLabel>
              <TextField
                type="number"
                placeholder="0"
                name="test"
                inputProps={{
                  "aria-label": "Sprint Point",
                  max: "10",
                  className: classes.numberInput,
                }}
                onChange={(event) =>
                  updateItemOnChange({ point: event.target.value }, "point")
                }
                value={content.point}
              />
              <Tooltip sx={{ ml: 1 }} title="Point the effort of your task">
                <ErrorIcon />
              </Tooltip>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel sx={{ mr: "5px" }}>Status :</InputLabel>
              <Select
                value={content.status}
                variant="outlined"
                inputProps={{
                  className: classes.selectInput,
                }}
                sx={{ color: "text.primary" }}
                onChange={(event) =>
                  updateItemOnChange({ status: event.target.value }, "status")
                }
              >
                <MenuItem value={"to-do"}>To Do</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel sx={{ mr: "5px" }}>Deadline : </InputLabel>
              <DatePicker
                deadlineHandler={deadlineHandler}
                deadline={content.deadline}
              />
            </FormControl>
            <Divider />
            <Grid sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Description</Typography>
              <InputBase
                style={{
                  width: "100%",
                }}
                sx={{ color: "text.primary" }}
                placeholder="Enter Description &#x270E;"
                multiline
                inputProps={{ "aria-label": "Description" }}
                onChange={(event) =>
                  updateItemOnChange(
                    { description: event.target.value },
                    "description"
                  )
                }
                value={content.description}
              />
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleModalClose}>
                Save
              </Button>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
}
