import * as React from "react";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import BoardView from "../../layout/BoardView";
import ListView from "../../layout/ListView";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Outlet } from "react-router-dom";
import Report from "../../layout/Report";

const renderViews = (view) => {
  switch (view) {
    case "Board":
      return <BoardView />;
    case "List":
      return <ListView />;
    case "Report":
      return <Report />;
    default:
      break;
  }
};

export default function Panel() {
  const [view, setView] = React.useState("Board");

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            pl: 4,
          }}
        >
          <FormControl sx={{ minWidth: 120 }} size="small">
            <Select
              value={view}
              onChange={handleViewChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"Board"} sx={{ display: "flex" }}>
                Board View
              </MenuItem>
              <MenuItem value={"List"}>List View</MenuItem>
              <MenuItem value={"Report"}>Report</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ m: 2, color: "text.primary" }} variant="h5">
            Case Study Panel
          </Typography>
        </Grid>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            p: { xs: "15px 0", xl: 4 },
          }}
        >
          {renderViews(view)}
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
