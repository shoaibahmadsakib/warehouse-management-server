const express = require("express");
const app = express();
//for connect front end using middlewire cors
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId =require( 'mongodb').ObjectId

//middlewire
app.use(cors());
app.use(express.json());

//for making a base url for showing brawser
app.get("/", (req, res) => {
  res.send("hello nodemon ");
});

//for runnig the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})