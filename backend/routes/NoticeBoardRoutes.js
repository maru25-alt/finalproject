import express from "express";
import Notifications from "../models/NoticeBoardModal.js";

const route = express.Router();
//get all
route.get("/", async (req, res) => {
  const data = await Notifications.find().sort({
    createdAt: "desc",
  });
  res.json(data);
});

//get all userID
route.get("/:id", async (req, res) => {
  const data = await Notifications.find({ userID: req.params.id }).sort({
    createdAt: "desc",
  });
  res.json(data);
});

//add notifications
route.post("/create", async (req, res) => {
  let body = req.body;

  Notifications.create(body)
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  Notifications.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
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
      res.json({ success: false, error: err });
    });
});

//remove one notification
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  Notifications.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//remove all
route.delete("/delete/all/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  Notifications.deleteMany({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default route;
