const mongoose = require('mongoose')

exports.connectToMongoDB = ()=> {
  try {
      mongoose.connect("mongodb+srv://codingworm:GVTpNLrxImrjAEDU@cluster0.1y0ng.mongodb.net/codingworm_db?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB...")
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}