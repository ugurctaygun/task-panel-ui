import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TaskModal from "../TaskModal";

export default function TaskCard({ content }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Card sx={{ minWidth: 275, m: 1 }}>
        <CardContent onClick={handleModalOpen}>
          <Typography variant="h5" component="div">
            {content}
          </Typography>
        </CardContent>
      </Card>
      <TaskModal
        content={content}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      />
    </>
  );
}
