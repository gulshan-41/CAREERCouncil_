const express = require('express');
const cors = require('cors');
const chatRouter = require('./src/routes/chat');
const dotenv = require('dotenv/config');
const {dbConnect} = require('./src/cofig/dbConnect.js')

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api', chatRouter);

app.get('/', (req, res) => {
  res.send('CareerCouncil backend running!');
});


dbConnect().then(() => {

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });

})

