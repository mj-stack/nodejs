const express = require('express')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
  res.send('mukuljoshi1819')
})

app.get('/login', (req, res) => {
  res.send('<h1>Please login here</h1>')
})

app.get('/youtube', (req, res) => {
  res.send('<h2>Chai aur code</h2>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})