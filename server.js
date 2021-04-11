require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/bookDB'
const path = require('path')
// import routes
const catalogRouter = require('./routes/catalogRoutes');

const app = express()
const port = process.env.PORT || 5000

mongoose.connect(uri, { useNewUrlParser : true, useUnifiedTopology : true })
   .catch( err => console.log(`Error on initial connection: ${err}`) )

mongoose.connection.once('open', function(){
   console.log('Connection successfully made to mongoDB local')
}).on('error', function(error){
   console.log('Connection Error:', error)
})

app.use(express.static(__dirname + '/public'));

// view engin set up
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')


app.use('/catalog', catalogRouter)

app.listen( port, () => {
   console.log(`Server running on port: ${port}`)
})
