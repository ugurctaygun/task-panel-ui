import React, { Suspense, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./layout/Header";
import Panel from "./views/Panel";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const theme = useSelector((state) => state.user.theme);
  const selectedTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const handleDrawer = () => {
    setDrawerOpen((current) => !current);
  };
  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={selectedTheme}>
        <Header handleDrawer={handleDrawer} />
        <Box
          style={{
            marginLeft: drawerOpen ? "240px" : "65px",
            minHeight: "100vh",
            transition: "0.2s all ease",
            background: selectedTheme.palette.background.default,
          }}
        >
          <Panel />
        </Box>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
