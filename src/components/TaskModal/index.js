import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, FormControl, Tooltip } from "@material-ui/core";
import { InputBase, Select, InputLabel, TextField, Modal } from "@mui/material";
import useStyles from "./style";
import { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import DatePicker from "../DatePicker";

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
  const classes = useStyles();
  const [value, setValue] = useState("Not Completed");
  const handleStatus = (event) => {
    setValue(event.target.value);
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {content}
          </Typography>
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
            />
            <Tooltip sx={{ ml: 1 }} title="Point the effort of your task">
              <ErrorIcon />
            </Tooltip>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel sx={{ mr: "5px" }}>Status :</InputLabel>
            <Select
              value={value}
              variant="outlined"
              inputProps={{
                className: classes.selectInput,
              }}
              sx={{ color: "text.primary" }}
              onChange={handleStatus}
            >
              <MenuItem value={"Not Completed"}>Not Completed</MenuItem>
              <MenuItem value={"Done"}>Done</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel sx={{ mr: "5px" }}>Deadline : </InputLabel>
            <DatePicker />
          </FormControl>

          <InputBase
            style={{
              width: "100%",
            }}
            sx={{ color: "text.primary" }}
            placeholder="Enter Description"
            multiline
            inputProps={{ "aria-label": "Description" }}
          />
        </Box>
      </Modal>
    </div>
  );
}
