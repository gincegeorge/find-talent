const User = require('../models/userSchema')
const hash = require("./helpers/hash");
const createToken = require("./helpers/createToken");
const generateError = require('./helpers/generateError');
const { debug } = require('../utils/debug');
const { doLogin } = require('./helpers/login');

const signUp = async (req, res) => {
    try {

        let { name, email, password } = req.body

        password = await hash(password)

        const user = await User.create({ name, email, password })

        const token = await createToken(user._id)

        debug(user)

        res.status(201).json({ created: true, user, token })

    } catch (err) {

        const error = generateError(err)

        debug(error)

        res.status(409).json({ created: false, error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    doLogin(email, password)
    res.send("done")
}

module.exports = { signUp, login }