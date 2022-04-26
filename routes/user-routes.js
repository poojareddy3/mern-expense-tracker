const express = require('express')
const router = express.Router()
//const {signup,login} = require('../controllers/user-controller')
const {signup,login, verifyToken, getUser} = require('../controllers/userController')

router.get('/', (req, res, next) => {
    res.send("Welcome to the Root!")
})

router.post('/signup', signup)
router.post('/login', login)
router.get('/user', verifyToken, getUser)
//verify token
module.exports = router
