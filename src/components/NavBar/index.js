import Box from "@mui/material/Box";
import { AppBar, IconButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { updateTheme } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function NavBar() {
  const theme = useSelector((state) => state.user.theme);
  const dispatch = useDispatch();
  const handleAlertMenu = () => {
    console.log("alert");
  };
  const handleTheme = () => {
    let userThemePref = theme === "light" ? "dark" : "light";
    dispatch(updateTheme(userThemePref));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Task Panel
          </Typography>

          <IconButton onClick={handleTheme} sx={{ p: 0, mr: 2 }}>
            {theme !== "light" ? (
              <LightModeIcon style={{ fill: "white" }} alt="LightMode" />
            ) : (
              <DarkModeIcon style={{ fill: "white" }} alt="Dark Mode" />
            )}
          </IconButton>
          <IconButton onClick={handleAlertMenu} sx={{ p: 0, mr: 2 }}>
            <AddAlertIcon style={{ fill: "white" }} alt="Alert" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
