import express from "express";
import CalendarModel from "../models/CalenderModel.js";

const route = express.Router();


//get all events
route.get('/', async(req, res) => {
    const docs = await CalendarModel.find();
    res.json(docs);
})


//search event by name


//get one by id
route.get('/:id', async(req, res) => {
  if(!req.params.id) {
      return res.status(400).send('Missing URL parameter: username')
    }
  await CalendarModel.findOne({ _id: req.params.id })
  .then(docs => {
      if(docs){
          return  res.json({success: true,docs})
      }
      else{
          return  res.json({success: false, error: 'Does not exists'})
      }
  })
  .catch(err => {
      return res.json({success: false, error: "Server error"})
  });
})

//create
route.post('/create', async(req, res) => {
    let body = req.body

   CalendarModel.create(body)
    .then(doc => {
        console.log(doc)
        res.json({success: true, doc});
      })
    .catch(err => {
        console.log(err)
        res.json({success: false, message:err})
    })
  });


//edit
route.put('/update/:id', (req, res) => {
    if(!req.params.id) {
      return res.status(400).send('Missing URL parameter: username')
    } 
  CalendarModel.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true
    })
    .then(doc => {
        console.log(doc)
        if(!doc){
          return res.json({success: false, error: "does not exists"})
       }
        return  res.json({success: true, doc});
      })
    .catch(err => {
        res.json({success: false, error:err})
    })
  
  });

//delete
route.delete('/delete/:id', (req, res) => {
    if(!req.params.id) {
      return res.status(400).send('Missing URL parameter: username')
    }
    CalendarModel.findOneAndRemove({
      _id: req.params.id
    })
    .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })



export default route;