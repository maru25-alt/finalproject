import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Message from "./MessageContainer";
import DefaultView from "./DefaultView";

function Messaging() {
  return (
    <div>
      <div className=" messages__container ">
        <Sidebar />
        <Switch>
          <Route component={Message} path="/chat/:id" />
          <Route component={DefaultView} path="/chat" />
        </Switch>
      </div>
    </div>
  );
}

export default Messaging;
