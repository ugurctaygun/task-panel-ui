import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((_theme) => ({
  numberInput: {
    padding: 0,
    margin: "3px 0 0  5px",
    maxWidth: "40px",
  },
  selectInput: {
    padding: "5px",
    marginLeft: "5px",
    minWidth: "120px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "15px 0 ",
  },
}));

export default useStyles;
