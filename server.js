// Initial setup

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const path = require('path')
/* Routes init goes here */

// Config
require('dotenv').config({path: path.resolve('config.env')})

// Passport
require('./config/passport')(passport)

// Connect the DB
connectDB() 

// More setup

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

/* App use routes go here */
app.use('/', mainRoutes)



app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
}) 

/* Login no longer crashes because of findOne callback, but also doesn't work
Fix layout of login page */