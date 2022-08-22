import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function DatePicker({ deadlineHandler, deadline }) {
  const [value, setValue] = React.useState(Date.now());
  const today = new Date();

  const handleChange = (newValue) => {
    setValue(newValue);
    deadlineHandler(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          value={deadline ? deadline : value}
          minDate={today}
          onChange={(event) => handleChange(event.toISOString())}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
