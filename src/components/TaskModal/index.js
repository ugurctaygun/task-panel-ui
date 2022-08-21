import Box from "@mui/material/Box";
import { MenuItem, FormControl, Tooltip } from "@material-ui/core";
import { InputBase, Select, InputLabel, TextField, Modal } from "@mui/material";
import useStyles from "./style";
import ErrorIcon from "@mui/icons-material/Error";
import DatePicker from "../DatePicker";
import { updateTask } from "../../store/slices/taskSlice";
import { useDispatch } from "react-redux";

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

export default function TaskModal({ modalOpen, handleModalClose, content }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const updateItemOnChange = (data, key) => {
    dispatch(updateTask({ id: content.id, item: data, key }));
  };
  const deadlineHandler = (data) => {
    updateItemOnChange({ deadline: data }, "deadline");
  };
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputBase
            style={{
              width: "100%",
            }}
            sx={{ color: "text.primary" }}
            placeholder="Enter Title"
            inputProps={{ "aria-label": "Title" }}
            onChange={(event) =>
              updateItemOnChange({ title: event.target.value }, "title")
            }
            value={content.title}
          />
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

          <InputBase
            style={{
              width: "100%",
            }}
            sx={{ color: "text.primary" }}
            placeholder="Enter Description"
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
        </Box>
      </Modal>
    </div>
  );
}
