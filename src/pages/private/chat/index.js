import React from "react";

import { Switch, Route } from "react-router-dom";

import ChatList from "./list";
import ChatRoom from "./room";

export default function Chat() {
  return (
    <Switch>
      <Route path="/chat/:chatId" component={ChatRoom} />
      <Route component={ChatList} />
    </Switch>
  );
}
