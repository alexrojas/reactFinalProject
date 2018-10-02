const express = require('express')
const app = express()
const mongoose  =  require('mongoose')
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const bodyParser = require('body-parser')

//DB config (commented out when ready part1 )
const db = require('./config/keys').mongoURI

//DB local database (take this one out when the other 2 are ready)
// mongoose.Promise = Promise;
// mongoose
//   .connect('mongodb://localhost/reactAPI')
//   .then(() => {
//     console.log('Connected to Mongo!')
//   }).catch(err => {
//     console.error('Error connecting to mongo', err)
//   });


//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




//Connect to MongoDB (commented out when ready part2)
mongoose.connect(db)
.then(()=> {
  console.log('MongoDb connected MDLAB')
})
.catch(err => console.log(err))


//passport middleware
app.use(passport.initialize())
//passport config
require('./config/passport')(passport)

// app.get('/', (req, res)=>{
//   res.send("test1 working ")
// })

//use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)



const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`server has started ${port}`))
