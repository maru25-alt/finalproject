import express from "express";
import FeesPaymentModel from "../models/FeesPaymentModel.js";

const route = express.Router();

//get banking details
route.get("/", async (req, res) => {
  const docs = await FeesPaymentModel.find();
  res.json(docs);
});

//get banking details
route.get("/:year/:term", async (req, res) => {
  const docs = await FeesPaymentModel.find({
    year: req.params.year,
    term: req.params.term,
  });
  res.json(docs);
});

//get one user details
route.get("/:id", async (req, res) => {
  const docs = await FeesPaymentModel.findOne({ userID: req.params.id });
  return res.json(docs);
});

route.post("/create", async (req, res) => {
  FeesPaymentModel.create(req.body)
    .then((data) => {
      if (data) {
        return res.json({ success: true, doc: data });
      } else {
        return res.json({ success: false, message: "something when wrong" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

//update class register
route.put("/update/:id", async (req, res) => {
  FeesPaymentModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      return res.json({ success: true, error: "OK" });
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

//delete
route.delete("/delete/:id", async (req, res) => {
  FeesPaymentModel.findOneAndDelete({
    _id: req.params.id,
  })
    .then((doc) => {
      return res.json({ success: true, message: "OK" });
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

export default route;
