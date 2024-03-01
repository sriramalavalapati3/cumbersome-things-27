
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const connection = new MongoClient(process.env.mongourl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the connection to the server	(optional starting in v4.7)
    await connection.connect();
    // Send a ping to confirm a successful connection
    await connection.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the connection will close when you finish/error
    await connection.close();
  }
}
run().catch(console.dir);
module.export={connection}
