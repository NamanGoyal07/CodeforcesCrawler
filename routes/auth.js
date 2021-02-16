const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const {registerValidation, loginValidation} = require("../validation")

router.post("/register", async(req,res) =>{

    // Let's validate the data before we proceed
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    // Checking is the user already exist in our database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email Already Exists');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpass
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);

    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;


