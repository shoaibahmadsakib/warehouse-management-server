const express = require("express");
const app = express();
//for connect front end using middlewire cors
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

//middlewire
app.use(cors());
app.use(express.json());

//connect mongo db

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.jcioh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("warehouse").collection("userinfo");

    app.get("/userinfo", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/userinfo", async (req, res) => {
      const newService = req.body;
      const result = await userCollection.insertOne(newService);
      res.send(result);
    });

    ///AUTH
    app.post("/login", async (req, res) => {
      const user = req.body;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ accessToken });
    });

    // get id
    app.delete("/userinfo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    //for finding a single id
    app.get("/userinfo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    //updating a card
    app.put("/userinfo/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoct = {
        $set: {
          quantity: updateUser.quantity,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updateDoct,
        options
      );
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

//for making a base url for showing brawser
app.get("/", (req, res) => {
  res.send("hello nodemon ");
});

//for runnig the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
