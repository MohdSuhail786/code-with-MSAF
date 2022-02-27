
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { logger } = require('./services/Logger')
const cors = require('cors')
const { connectToMongoDB } = require('./config/db')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectToMongoDB()

const port = process.env.PORT || 8000

app.use('',require('./routes/api'))

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
    logger.info("Server started at port "+port )
})