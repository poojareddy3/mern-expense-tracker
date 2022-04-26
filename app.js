const express = require('express');
const cors = require('cors')
const logger = require('morgan')
const router = require('./routes/transaction-routes')
const routes = require('./routes/user-routes')
const cookieParser = require('cookie-parser')


const app = express();
app.use(cors({credentials: true, origin:'http://localhost:3001'}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.use(logger('dev'))

//app.use('/api', routes)
app.use('/api', routes)
app.use('/api', router)
// app.use('/api', (req, res, next) => {
//     res.send("Hello There!")
// })

module.exports = app