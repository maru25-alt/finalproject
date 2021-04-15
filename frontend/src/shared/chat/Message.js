import React from "react";
import { timeStamp } from "../../utils";

function Message({ message, currentUser }) {
  return (
    <>
      {message?.role === "alert" ? (
        <div
          className={currentUser === message?.senderID ? "sender__alert" : ""}
        >
          {message?.message}
        </div>
      ) : (
        <div
          className={
            currentUser === message?.senderID
              ? "sender__message message"
              : "message"
          }
        >
          <div className="message__content">{message?.message}</div>
          <div className="message__time ">{timeStamp(message.date)}</div>
        </div>
      )}
    </>
  );
}

export default Message;
