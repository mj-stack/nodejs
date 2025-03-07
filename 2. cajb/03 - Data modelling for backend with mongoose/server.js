const express =  require('express')
const app = express()
require('dotenv')

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})