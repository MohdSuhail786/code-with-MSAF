
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 8000

app.use('/api/v1/',require('./routes/api'))

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})