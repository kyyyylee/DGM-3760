const express = require('express')
const hostname = "127.0.0.1"
const app = express()
const port = 3001

app.use(express.static('client'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded ( {extended: true}))

app.listen(port, () => {
    console.log(`Example app listening on port http://${hostname}:${port}`)
})

