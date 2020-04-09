import { makeStyles } from "@material-ui/core/styles";
import bg from "../../images/bg.png";

const useStyles = makeStyles(theme => ({
  loadingBlock: {
    display: "block",
    position: "relative",
    width: "100%",
    height: "100vh",
    "&:before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      zIndex: -1
    }
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: "center"
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh"
  }
}));

export default useStyles;
