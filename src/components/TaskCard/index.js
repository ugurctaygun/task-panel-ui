import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TaskModal from "../TaskModal";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CardActions, CardHeader, IconButton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function TaskCard({ content }) {
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = () => {
    if (content.deadline) {
      let today = content.deadline.toISOString().slice(0, 10);

      const startDate = Date.now();
      const endDate = today;

      const diffInMs = new Date(endDate) - new Date(startDate);
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      return diffInDays;
    }
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const deadlineCondition = () => {
    if (content.deadline && content.status !== "done") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Card sx={{ minWidth: 275, m: 1 }} onClick={handleModalOpen}>
        <CardHeader
          action={
            <IconButton aria-label="drag">
              <DragIndicatorIcon />
            </IconButton>
          }
          title={content.taskId}
          titleTypographyProps={{ variant: "subtitle2" }}
          sx={{ pb: 0 }}
        />
        <CardContent>
          <Typography>{content.title}</Typography>
        </CardContent>
        {deadlineCondition() && (
          <CardActions>
            <>
              <AccessTimeIcon sx={{ scale: "0.8", mr: 1 }} />
              <Typography variant="subtitle2">
                {formatDate() < 0 ? "Overdue" : formatDate() + " day left"}
              </Typography>
            </>
          </CardActions>
        )}
      </Card>
      <TaskModal
        content={content}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      />
    </>
  );
}
