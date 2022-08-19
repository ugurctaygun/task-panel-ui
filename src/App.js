import React, { Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./layout/Header";
import Panel from "./views/Panel";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

function App() {
  const theme = useSelector((state) => state.user.theme);
  const selectedTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={selectedTheme}>
        <Header />
        <Box style={{ marginLeft: "50px" }}>
          <Panel />
        </Box>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
