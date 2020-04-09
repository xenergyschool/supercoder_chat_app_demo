import { makeStyles } from "@material-ui/styles";
import bg from "../../images/bg.png";

const useStyles = makeStyles(theme => ({
  forpassBlock: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    height: 320,
    borderRadius: "0 0 100% 100%",
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
      height: 320,
      position: "absolute",
      top: 0,
      left: 0,
      borderRadius: "0 0 100% 100%",
      zIndex: 1
    }
  },
  forpassBox: {
    position: "relative",
    height: "100%",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    flexFlow: "column nowrap"
  },
  logoBox: {
    width: 282,
    height: 69,
    margin: "30px auto 20px"
  },
  title: {
    //color: theme.palette.primary.main
    textAlign: "center",
    marginBottom: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: "none"
  },
  buttons: {
    marginTop: theme.spacing(6)
  }
}));

export default useStyles;
