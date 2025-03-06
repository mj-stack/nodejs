const express = require('express');
const app = express();

app.get('/api/vehicles', (req, res) => {
  const vehicles = [{
    id: 1,
    name: 'Bugati Cheron',
    type: 'Car'
  }, {
    id: 2,
    name: 'Bajaj Pulsar',
    type: 'Bike'
  }, {
    id: 3,
    name: 'Hero Atlas',
    type: 'Cycle'
  }]
  res.send(vehicles)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})