import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSelector } from "react-redux";
import { Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTask } from "../../store/slices/taskSlice";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function ListView() {
  const tasks = useSelector((state) => state.tasks.value);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleModalOpen = (id) => {
    navigate(`/panel/${id}`);
  };

  const handleAddTask = () => {
    const newTaskObject = {
      title: "",
      description: "",
      points: 0,
      status: "to-do",
      deadline: null,
    };
    dispatch(createTask(newTaskObject));
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - tasks.taskList.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box
      sx={{
        maxWidth: "900px",
      }}
    >
      <TableContainer
        sx={{ display: "flex", justifyContent: "center" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead style={{ backgroundColor: "#1976d2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ width: "100px" }}>Status</TableCell>
              <TableCell sx={{ width: "150px" }}>Task ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Point</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.taskList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <>
                  <TableRow
                    key={row.id}
                    onClick={() => handleModalOpen(row.taskId)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      {row.status !== "done" ? (
                        <Chip label="Incomplete" color="error" />
                      ) : (
                        <Chip label="Done" color="success" />
                      )}
                    </TableCell>
                    <TableCell>{row.taskId}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      {row.description.length > 50
                        ? row.description.substring(0, 50) + "..."
                        : row.description}
                    </TableCell>
                    <TableCell>{row.points}</TableCell>
                  </TableRow>
                </>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Box>
                <Button
                  onClick={handleAddTask}
                  variant="contained"
                  size="small"
                  sx={{ m: "15px 0 15px 15px", width: "150px" }}
                >
                  Add New Task
                </Button>
              </Box>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={tasks.taskList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
