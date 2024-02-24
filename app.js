const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send({test: 'test'});
})

app.post('/sendTickets', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})