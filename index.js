const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    app.post("/coffees", async(req, res) => {
        const user = req.body;
        console.log(user);
        const result = await coffeeCollection.insertOne(user);
        res.send(result);
      })

      app.get("/coffees", async(req, res) => {
        
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
