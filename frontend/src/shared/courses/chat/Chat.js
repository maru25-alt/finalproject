import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";

function MessageContainer({ id, classID }) {
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/courseschat/chats/${id}/${classID}`).then(async (res) => {
      setmessages(res.data?.messages);
    });
  }, [id, classID]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      axios
        .put(`/courseschat/send/${id}/${classID}`, {
          message,
          senderID: currentUser?.userID,
        })
        .then((res) => {
          setmessages(res.data.doc?.messages);
          setmessage("");
        });
    }
  };

  return (
    <div className="message__container">
      <div className="message__messages p-3">
        {messages &&
          messages.map((e) => (
            <Message
              message={e}
              key={e._id}
              currentUser={currentUser?.userID}
            />
          ))}
      </div>
      <form onSubmit={handleSendMessage} className="send">
        <input
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          type="text"
          placeholder="Type here ..."
        />
        <button type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageContainer;
