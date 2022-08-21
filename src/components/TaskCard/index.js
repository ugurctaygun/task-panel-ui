import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TaskModal from "../TaskModal";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CardHeader, IconButton } from "@mui/material";

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
        <CardHeader
          action={
            <IconButton aria-label="drag">
              <DragIndicatorIcon />
            </IconButton>
          }
          title="#CONG-5565"
          titleTypographyProps={{ variant: "subtitle2" }}
          sx={{ pb: 0 }}
        />
        <CardContent onClick={handleModalOpen}>
          <Typography>{content}</Typography>
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
