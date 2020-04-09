import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({
  contactBox: {
    display: "flex",
    flexFlow: "row nowrap",
    width: "80%",
    alignItems: "center"
  },
  contactAvatar: {
    marginRight: 5
  },
  contactNameWrap: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  contactName: {
    marginBottom: -5
  },
  chatWindow: {
    width: "100%",
    margin: "0 auto",
    position: "relative",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    padding: "0 15px 65px",
    backgroundColor: "#efefef"
  },
  chatDayWrap: {
    margin: "10px auto 15px",
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    textAlign: "center"
  },
  chatInput: {
    width: "100%",
    backgroundColor: "#fff",
    position: "fixed",
    left: 0,
    bottom: 0,
    border: "solid 1px #ddd",
    zIndex: 2,
    padding: theme.spacing(1)
  },
  yourChatBubble: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    margin: "0 auto 30px"
  },
  yourTextBody: {
    width: "fit-content",
    backgroundColor: "#fff",
    textAlign: "left",
    padding: 10,
    borderRadius: 8,
    position: "relative",
    marginRight: 17,
    display: "flex",
    flexFlow: "column nowrap",
    "&::before": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      left: -10,
      right: "auto",
      top: 0,
      bottom: "auto",
      border: "12px solid",
      borderColor: "#ffffff transparent transparent transparent"
    }
  },
  yourTimeStamp: {
    color: theme.palette.primary.main,
    alignSelf: "flex-end",
    fontSize: 9
  },
  myChatBubble: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    margin: "0 auto 20px",
    paddingLeft: 25
  },
  myTextBody: {
    width: "fit-content",
    maxWidth: "100%",
    backgroundColor: "#e153f9",
    textAlign: "left",
    padding: 10,
    borderRadius: 8,
    position: "relative",
    alignSelf: "flex-end",
    marginBottom: 10,
    "&::before": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      right: -8,
      top: 0,
      bottom: "auto",
      border: "12px solid",
      borderColor: "#e153f9 transparent transparent transparent"
    }
  },
  myText: {
    color: "#fff"
  },
  deliveryDetail: {
    position: "relative",
    textAlign: "right",
    paddingRight: 5,
    display: "flex",
    flexFlow: "row nowrap"
  },
  iconRead: {
    width: 12,
    height: 12,
    color: "#fff"
  },
  iconSent: {
    width: 12,
    height: 12,
    color: "#fff"
  },
  timeStamp: {
    color: "#fff",
    alignSelf: "flex-end",
    fontSize: 9
  }
}));
