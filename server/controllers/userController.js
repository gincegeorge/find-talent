const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const hash = require("./helpers/hash");
const createToken = require("./helpers/createToken");

const signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body

        password = await hash(password)

        const user = await User.create({ name, email, password })

        console.log(user);

        const token = await createToken(user._id)

        


        console.log(token);

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    signUp
}