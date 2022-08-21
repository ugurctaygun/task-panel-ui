import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import Panel from "./views/Panel";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import TaskModal from "./components/TaskModal";

function App() {
  const theme = useSelector((state) => state.user.theme);
  const selectedTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return (
    <ThemeProvider theme={selectedTheme}>
      <Header />

      <Box
        style={{
          minHeight: "100vh",
          transition: "0.2s all ease",
          background: selectedTheme.palette.background.default,
        }}
      >
        <Routes>
          <Route exact path="/" element={<Panel />}>
            <Route path="panel/:id" element={<TaskModal />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
