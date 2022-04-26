const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "MyKey"

const signup = async (req, res, next) => {
    const { name, email,password } = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch (error) {
        console.log(error)
    }
    if(existingUser){
        return res.status(400).json({message: "User already exists! Please use Login!"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    })
    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }
    return res.status(201).json({message: user})
}

const login = async (req, res, next) => {
    const { email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email:email})
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(400).json({message: 'User does not exist. Please Signup!'})
    }
    // compare the req.body password to the exisitng user password
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: 'Invalid Email/Password'})
    }
    const token = jwt.sign({id: existingUser._id}, JWT_SECRET_KEY, {
        expiresIn: "1hr"
    })

    res.cookie(String(existingUser._id),token,{
        path: '/',
        expires: new Date(Date.now() + 1000 * 1000),
        httpOnly: true,
        sameSite: 'lax'
    })
    return res.status(200).json({message: 'Successfully Logged In!', user:existingUser, token})
}


const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token)
    const header = req.headers['authorization'];
    if(!token){
        res.status(404).json({message: "No Token found"})
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user) => {
        if(err){
            res.status(400).json({message: "Invalid Token!"})
        }
        //console.log(user.id);
        req.id = user.id
    })
    next();
}

const getUser = async (req, res, next) => {
     const userId = req.id;
     let user;
     try {
         user = await User.findById(userId,"-password");
     } catch (error) {
         return new Error(error)
     }
     if(!user){
         return res.status(404).json({message: "User not found!"})
     }
     return res.status(200).json({user})
}

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;