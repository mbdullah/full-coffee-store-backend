const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://BestPetStore:Z7WPndDoT7SIxUR6@cluster0.jsryxpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const coffeeCollection = client.db("DBuser").collection("coffees");
    const usersCollection = client.db("DBuser").collection("users")

    app.get("/coffees", async(req, res) => {
        const result = await coffeeCollection.find().toArray();
        res.send(result);
      })

      app.get("/coffees/:id", async(req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await coffeeCollection.findOne(query);
        res.send(result);
      })

    app.post("/coffees", async(req, res) => {
        const user = req.body;
        const result = await coffeeCollection.insertOne(user);
        res.send(result);
      })

      app.put("/coffees/:id", async(req, res) => {
        const id = req.params.id;
        const updateUser = req.body;
        const filter = {_id : new ObjectId(id)}
        const options = { upsert: true };
        const updatedDoc = {
          $set : updateUser
        }
        const result = await coffeeCollection.updateOne(filter, updatedDoc, options);
        res.send(result);
      })

      app.delete("/coffees/:id", async(req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await coffeeCollection.deleteOne(query);
        res.send(result);
      })

      //? Users Api Store : =====>

        app.get("/users", async(req, res) => {
          const result = await usersCollection.find().toArray();
          res.send(result);
        })

        app.post("/users", async(req, res)=> {
          const user = req.body;
          console.log(user);
          const result = await usersCollection.insertOne(user);
          res.send(result);
        })

        app.delete("/users/:id", async(req, res) => {
          const id = req.params.id;
          const query = {_id : new ObjectId(id)}
          const result = await usersCollection.deleteOne(query);
          res.send(result);
        })

      

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } 
  finally {

  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My Pet store is running");
});

app.listen(port, () => {
  console.log(`My Pet Store running on Port : ${port}`);
});
