import * as React from "react";
import { Tab, Tabs, Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import BoardView from "../../layout/BoardView";
import ReorderIcon from "@mui/icons-material/Reorder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PieChartIcon from "@mui/icons-material/PieChart";
import ListView from "../../layout/ListView";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Grid>{children}</Grid>
        </Box>
      )}
    </div>
  );
}

export default function Panel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography sx={{ m: 2 }} align="center" variant="h5">
          Case Study
        </Typography>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Panel Tabs"
          centered
        >
          <Tab
            icon={<ReorderIcon style={{ transform: "rotate(90deg)" }} />}
            label="Board"
          />
          <Tab icon={<FormatListBulletedIcon />} label="List" />
          <Tab icon={<PieChartIcon />} label="Report" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BoardView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListView />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
