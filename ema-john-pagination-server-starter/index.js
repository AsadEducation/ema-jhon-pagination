const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const { parse } = require('dotenv');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ueh5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db('emaJohnDB').collection('products');

    app.get('/products', async (req, res) => {

      //retrieve the size and page and ready it for query

      let { size, currentPage } = req.query;

      size = parseInt(size)|| 10;
      currentPage = parseInt(currentPage)||0;

      let skip=0;

      if(currentPage){

        skip = (currentPage - 1)*size;

      }

      const result = await productCollection.find().skip(skip).limit(size).toArray();
      res.send(result);

    })

    // counting total number of documents in the collection 

    app.get('/product-count', async (req, res) => {

      const result = (await productCollection.estimatedDocumentCount());
      // console.log(result);

      res.send({ count: result });
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('john is busy shopping')
})

app.listen(port, () => {
  console.log(`ema john server is running on port: ${port}`);
})
