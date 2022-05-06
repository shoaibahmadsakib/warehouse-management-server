const express = require("express");
const app = express();
//for connect front end using middlewire cors
const cors = require("cors");
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
    const personalCollection = client.db("warehouse").collection("myitem");
   

   app.get("/userinfo", async (req, res) => {
      const email =req.query.email;
      
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


   


    // app.delete("/myitem/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await personalCollection.deleteOne(query);
    //   res.send(result);
    // });


    // app.get("/myitem/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await userCollection.findOne(query);
    //   res.send(result);
    // });

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
          // name: updateUser.name,
          // describtion: updateUser.describtion,
          // price: updateUser.email,
          quantity: updateUser.quantity,
          // image: updateUser.image,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updateDoct,
        options
      );
      res.send(result);
    });

    //inventory
    // app.put("/userinfo/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updateUser = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoct = {
    //     $set: {
          
    //       quantity: updateUser.quantity,
        
    //     },
    //   };
    //   const result = await userCollection.updateOne(
    //     filter,
    //     updateDoct,
    //     options
    //   );
    //   res.send(result);
    // });
    // app.get("/userinfo/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await userCollection.findOne(query);
    //   res.send(result);
    // });



    // app.post("increment/:id") ,async (req, res) => {
    //   const { id } = req.params;
    //   collection.updateOne({ _id: id }, { $inc: { views: 1 } });
    //   return res.status(200).json({ msg: "OK" });
    // };
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

//warehouse
//yGGTnsPqCXmLAVTH
