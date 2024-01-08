const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'eventLogs';

app.use(bodyParser.json());
app.post('/saveEvent', async (req, res) => {
  console.log('Received request'); // Log that the request is received
  const eventData = req.body;
  let client = null;
  try {
      const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db(dbName);
      const collection = db.collection('events');

      // Perform your operations here (e.g., insertOne)
      await collection.insertOne(eventData);

      console.log('Event saved successfully'); // Log success
      res.status(200).send('Event saved successfully');
  } catch (error) {
      console.error('Error saving event to database:', error);
      res.status(500).send('Error saving event to database');
  } finally {
      if (client) {
          client.close();
      }
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'clickme.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});