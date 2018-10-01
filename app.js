const express = require('express')
const app = express()
const mongoose  =  require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const bodyParser = require('body-parser')

//DB config
const db = require('./config/keys').mongoURI

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




//Connect to MongoDB
mongoose.connect(db)
.then(()=> {
  console.log('MongoDb connected')
})
.catch(err => console.log(err))


app.get('/', (req, res)=>{
  res.send("test1 working ")
})

//use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)



const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`server has started ${port}`))
