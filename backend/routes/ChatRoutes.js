import express from "express";
import ChatModel from "../models/ChatModel.js";
import { sendFriendRequest, sendMessage } from "../middlewares/validate.js";

const route = express.Router();

route.get("/", async (req, res) => {
  const docs = await ChatModel.find();
  res.json(docs);
});

//user chats
route.get("/chats/:id", async (req, res) => {
  if (!req.params.id) {
    return res.json({ success: false, error: " id is required" });
  }
  const messageChats = await ChatModel.find({
    $or: [{ acceptor_id: req.params.id }, { requestor_id: req.params.id }],
  });
  res.json(messageChats);
});

//get channel chat messages

route.get("/chat/:id/:id2", async (req, res) => {
  if (!req.params.id) {
    return res.json({ success: false, error: " id is required" });
  }
  console.log(req.params.id2);
  ChatModel.findOne({
    $or: [
      { acceptor_id: req.params.id, requestor_id: req.params.id2 },
      { requestor_id: req.params.id, acceptor_id: req.params.id2 },
    ],
  })
    .then((doc) => {
      console.log(doc, "doc");
      return res.json(doc);
    })
    .catch((err) => {
      console.log(err, "err");
      return res.json({ success: false, message: "something when wrong" });
    });
});

//send friend request
route.post("/create", async (req, res) => {
  let body = req.body;
  const { error } = sendFriendRequest.validate(body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  //check if there is aconnection already
  const checkConnection = await ChatModel.findOne({
    $or: [{ acceptor_id: req.params.id }, { requestor_id: req.params.id }],
  });

  if (checkConnection) {
    console.log(checkConnection);
    return res.json({ success: false, error: "You are already friends" });
  }

  let messages = [
    {
      senderID: body.requestor_id,
      message: "Send friend Request",
      role: "alert",
    },
  ];

  ChatModel.create({ ...body, messages })
    .then((doc) => {
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: err });
    });
});

//accept friend request
route.post("/request/:id", async (req, res) => {
  let body = req.body;
  const { error } = sendFriendRequest.validate(body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  //check if there is aconnection already
  const checkConnection = ChatModel.findOne({
    acceptor_id: body.acceptor_id,
    requestor_id: body.requestor_id,
    status: true,
  });

  if (checkConnection) {
    return res.json({ success: false, error: "You are already friends" });
  }

  ChatModel.findOneAndUpdate(
    {
      _id: req.params.id,
      acceptor_id: req.body.acceptor_id,
    },
    { status: true },
    { new: true }
  )
    .then((doc) => {
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: err });
    });
});

//send email to parents
route.post("/send/parents", (req, res) => {
  const mailOptions = {
    from: "rudomaru25@email.com",
    to: req.body.email,
    subject: "Link to reset Password",
    html:
      "<!DOCTYPE html>" +
      "<html><head><title>Dear Parents</title>" +
      "</head><body>" +
      "<h2> RE : School</h2>" +
      " <p>" +
      req.body.message +
      "</p>" +
      "</body></html>",
  };

  transport.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      return res.send({ error: error.response });
    }
    return res.json(data);
  });
});

//send email to parents
route.post("/send/parents/:id", (req, res) => {
  const mailOptions = {
    from: "rudomaru25@email.com",
    to: req.body.email,
    subject: "Link to reset Password",
    html:
      "<!DOCTYPE html>" +
      "<html><head><title>Dear Parents</title>" +
      "</head><body>" +
      "<h2> RE : School</h2>" +
      " <p>" +
      req.body.message +
      "</p>" +
      "</body></html>",
  };

  transport.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      return res.send({ error: error.response });
    }
    return res.json(data);
  });
});

//send message
route.put("/send/:id/:id2", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  const { error } = sendMessage.validate(req.body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  //check whether there is connection
  const checkConnection = ChatModel.findOne({
    $or: [
      { acceptor_id: req.params.id, requestor_id: req.params.id2 },
      { requestor_id: req.params.id, acceptor_id: req.params.id2 },
    ],
    status: true,
  });

  if (!checkConnection) {
    return res.json({ success: false, error: "you are not friends" });
  }

  ChatModel.findOneAndUpdate(
    {
      $or: [
        { acceptor_id: req.params.id, requestor_id: req.params.id2 },
        { requestor_id: req.params.id, acceptor_id: req.params.id2 },
      ],
    },
    { $push: { messages: req.body } },
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//delete message
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  const { error } = sendMessage.validate(req.body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  //check whether there is connection
  const checkConnection = ChatModel.findOne({
    _id: req.params.id,
  });

  if (!checkConnection) {
    return res.json({ success: false, error: "you are not friends" });
  }

  ChatModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $pushAll: { messages: { _id: req.body.id } } },
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//delete all messages
route.delete("/deleteAll/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  const { error } = sendMessage.validate(req.body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  //check whether there is connection
  const checkConnection = ChatModel.findOne({
    _id: req.params.id,
  });

  if (!checkConnection) {
    return res.json({ success: false, error: "you are not friends" });
  }

  ChatModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { messages: [] },
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//block user
route.post("/block/:id", async (req, res) => {
  let body = req.body;
  const { error } = sendFriendRequest.validate(body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  //check if there is aconnection already
  const checkConnection = ChatModel.findOne({
    acceptor_id: body.acceptor_id,
    requestor_id: body.requestor_id,
    status: true,
  });

  if (!checkConnection) {
    return res.json({ success: false, error: "You are already not friends" });
  }

  ChatModel.findOneAndUpdate(
    {
      _id: req.params.id,
      acceptor_id: req.body.acceptor_id,
    },
    { status: false },
    { new: true }
  )
    .then((doc) => {
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: err });
    });
});

export default route;
