import express from "express";
import ChatModel from "../models/CourseChatModel.js";
import { sendFriendRequest, sendMessage } from "../middlewares/validate.js";

const route = express.Router();

route.get("/", async (req, res) => {
  const docs = await ChatModel.find();
  res.json(docs);
});

//user chats
route.get("/chats/:id/:classID", async (req, res) => {
  if (!req.params.id) {
    return res.json({ success: false, error: " id is required" });
  }
  const messageChats = await ChatModel.findOne({
    classID: req.params.classID,
    courseID: req.params.id,
  });

  if (!messageChats) {
    ChatModel.create({ classID: req.params.classID, courseID: req.params.id })
      .then((docs) => {
        return res.json(docs);
      })
      .catch((err) => {
        return res.json({ success: false, error: err });
      });
  } else {
    return res.json(messageChats);
  }
});

//send message
route.put("/send/:id/:classID", (req, res) => {
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
    classID: req.params.classID,
    courseID: req.params.id,
  });

  if (!checkConnection) {
    ChatModel.create({ classID: req.params.classID, courseID: req.params.id })
      .then(() => {
        return res.json([]);
      })
      .catch((err) => {
        return res.json({ success: false, error: err });
      });
  }

  ChatModel.findOneAndUpdate(
    {
      classID: req.params.classID,
      courseID: req.params.id,
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

export default route;
