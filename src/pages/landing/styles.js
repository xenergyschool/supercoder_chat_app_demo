import { makeStyles } from "@material-ui/styles";
import bg from "../../images/bg.png";

const useStyles = makeStyles(theme => ({
  landingBlock: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    height: "100vh",
    position: "relative",
    "&:before": {
      content: '""',
      backgroundImage:
        "radial-gradient(50% 42%, " +
        theme.palette.primary.light +
        " 50%, " +
        theme.palette.primary.main +
        " 99%)",
      opacity: ".9",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1
    }
  },
  landingBox: {
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: 2
  },
  logoBox: {
    width: 282,
    height: 69,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto"
  },
  btnBox: {
    width: 240,
    height: 120,
    position: "absolute",
    top: "auto",
    left: 0,
    right: 0,
    bottom: 20,
    margin: "auto",
    display: "flex",
    flexFlow: "column nowrap"
  },
  btnDaftar: {
    color: theme.palette.primary.main,
    backgroundColor: "#fff",
    marginBottom: 20
  },
  btnLogin: {
    background: "transparent",
    color: "#fff",
    border: "solid 1px #fff"
  },
  buttons: {
    marginTop: theme.spacing(6)
  }
}));

export default useStyles;
