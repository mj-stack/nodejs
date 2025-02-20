const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Welcome to my hotel. How I can help you?')
})

app.get('/chicken', (req, res) => {
  res.send('Sure why not?')
})

app.listen(3000)