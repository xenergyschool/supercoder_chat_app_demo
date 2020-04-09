import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";

import { firestore, useFirebase } from "../../../components/FirebaseProvider";
import { useParams } from "react-router-dom";

import { unixToTime } from "../../../utils/datetime";
import { classes } from "istanbul-lib-coverage";
import useStyles from "./styles/room";

export default function MessageIn({ message }) {
  const params = useParams();
  const { user } = useFirebase();
  const classes = useStyles();

  useEffect(() => {
    if (!message.is_read) {
      const readChat = async () => {
        try {
          await firestore
            .doc(`chats/${params.chatId}/messages/${message.id}`)
            .set(
              {
                is_read: true
              },
              { merge: true }
            );

          await firestore.doc(`chats/${params.chatId}`).set(
            {
              unread_count: {
                [user.uid]: 0
              }
            },
            { merge: true }
          );
        } catch (e) {
          console.log(e.message);
        }
      };

      readChat();
    }
  }, [message.is_read, message.id, params.chatId, user.uid]);

  return (
    <React.Fragment>
      <div className={classes.yourChatBubble}>
        <div className={classes.yourTextBody}>
          {message.text.split("\n").map((text, i) => {
            return (
              <Typography className={classes.yourText} color="primary" key={i}>
                {text}
              </Typography>
            );
          })}
          <div className={classes.yourTimeStamp}>
            <Typography variant="caption">
              {unixToTime(message.created_at && message.created_at.toMillis())}
            </Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
