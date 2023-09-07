//@desc register
//@route GET /api/register
//@access public

const expressAsyncHandler = require ("express-async-handler");
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = expressAsyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(404);
        throw new Error("All fields are mandatory");
    }

    const useravailable = await User.findOne({email});

    if (useravailable ) {
        res.status(400);
        throw new Error("User already registered");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: await bcrypt.hash(password, 10)});

    console.log('hashedPasswordhashedPassword', hashedPassword)
    console.log('user created', user);
    if (user) {
        res.status(201).json({_id: user._id, email: user.email})
    } else {
        res.status(400);
        throw new Error('Error in creating user');
    }

    // res.json(user);
});

const login = expressAsyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory')
    }

    const user = User.findOne({email});
    //compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id       
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
        res.status(200).json({accessToken: accessToken});
    } else {
        res.status(401);
        throw new Error('email or pwd is not valid');
    }
});

module.exports = {
    register,
    login
}