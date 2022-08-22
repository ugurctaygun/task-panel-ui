import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((_theme) => ({
  numberInput: {
    padding: 0,
    maxWidth: "40px",
  },
  selectInput: {
    padding: "6px 14px",
    marginLeft: "5px",
    minWidth: "120px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "15px 0 ",
    "& input": {
      padding: "6px 15px",
    },
    "& select": {
      padding: "6px 15px",
    },
  },
}));

export default useStyles;
