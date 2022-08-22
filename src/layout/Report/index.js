import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PieChart from "../../components/PieChart";
import { LineChart } from "../../components/LineChart";

export default function Report() {
  const tasks = useSelector((state) => state.tasks.value);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", xl: "row" },
        justifyContent: "flex-start",
        alignItems: { xs: "center", xl: "start" },
      }}
    >
      <Grid
        sx={{
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mr: { xs: 0, xl: 10 },
          mb: 8,
        }}
      >
        <Typography sx={{ mb: 1, color: "text.primary" }}>
          Panel Progress
        </Typography>
        <PieChart taskData={tasks.taskList} />
      </Grid>
      <Grid
        sx={{
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mb: 1, color: "text.primary" }}>
          Sprint Progress (Mock)
        </Typography>
        <LineChart taskData={tasks.taskList} />
      </Grid>
    </Box>
  );
}
