const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], async(req, res) => {
    //If there are errors , return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{

    //check weather user with the same mail the user exists
    let user =await User.findOne({email:req.body.email})
    console.log(user)
    if(user){
        return res.status(400).json("Sorry a user with the email already exists")
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    // .then(user => res.json(user))
    // .catch(err => {
    //     console.error(err);
    //     res.status(500);
    //     res.json({error: 'please enter a unique value',message:err.message})
    // });
    res.json(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some thing is wrong")
    }
});
module.exports = router;
