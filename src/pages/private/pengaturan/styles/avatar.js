import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({
  avatarWrap: {
    width: 90,
    height: 90,
    margin: "20px auto 0",
    borderRadius: "100%"
  },
  avatar: {
    width: 90,
    height: 90,
    border: "solid 3px " + theme.palette.primary.main
  }
}));
