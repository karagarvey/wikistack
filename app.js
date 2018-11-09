const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.urlencoded({extended: false}))

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send('hello world!')
})

const port = 8080
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
