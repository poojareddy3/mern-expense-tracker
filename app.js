const express = require('express');
const cors = require('cors')
const logger = require('morgan')
const router = require('./routes/transaction-routes')
const routes = require('./routes/user-routes')
const cookieParser = require('cookie-parser')


const app = express();
//app.use (cors())
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
});
app.use(cors({credentials: true, origin:true, }))
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