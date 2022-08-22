import { FormControl, Tooltip } from "@material-ui/core";
import {
  InputBase,
  Select,
  InputLabel,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  DialogContent,
} from "@mui/material";
import useStyles from "./style";
import ErrorIcon from "@mui/icons-material/Error";
import DatePicker from "../DatePicker";
import { updateTask, deleteTask } from "../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActionMenu from "../ActionMenu";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

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
  const handleModalClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    } else {
      navigate("/");
    }
  };
  const handleDelete = () => {
    dispatch(deleteTask(content._id));
    navigate("/");
  };
  const handleSave = (id) => {
    dispatch(updateTask(content, id));
    navigate("/");
  };
  const updateItemOnChange = (key, value) => {
    const newContent = { ...content, [key]: value };
    setContent(() => ({ ...newContent }));
  };
  const deadlineHandler = (data) => {
    updateItemOnChange("deadline", data);
  };
  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="task-dialog"
        aria-describedby="edit-task"
      >
        <DialogContent>
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
                updateItemOnChange("title", event.target.value)
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
                updateItemOnChange("point", event.target.value)
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
              native
              value={content.status}
              variant="outlined"
              inputProps={{
                className: classes.selectInput,
              }}
              sx={{ color: "text.primary" }}
              onChange={(event) =>
                updateItemOnChange("status", event.target.value)
              }
            >
              <option value={"to-do"}>To Do</option>
              <option value={"done"}>Done</option>
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
                updateItemOnChange("description", event.target.value)
              }
              value={content.description}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              color="info"
              onClick={handleModalClose}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleSave(content.id)}
            >
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
