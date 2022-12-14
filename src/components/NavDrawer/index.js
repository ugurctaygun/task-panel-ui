import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (_theme) => ({
  width: drawerWidth,
  transition: "0.2s all ease",
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: "0.2s all ease",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: "64px",
  },
});

export default function NavDrawer({ handleDrawer }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerSlide = () => {
    setOpen((current) => !current);
    handleDrawer();
  };

  return (
    //sx={{ display: { xl: "block", xs: "none" } }}
    <Grid>
      <Drawer
        variant="permanent"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <DrawerHeader sx={{ height: 64 }}>
          <IconButton onClick={handleDrawerSlide}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 46,
                justifyContent: open ? "start" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Panels"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }}>
                <ListItemIcon>
                  <ArrowForwardIosIcon sx={{ scale: "0.6" }} />
                </ListItemIcon>
                <ListItemText primary="Case Study" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 6, cursor: "not-allowed" }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add New" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
    </Grid>
  );
}
