const User = require('../models/userSchema')
const generateError = require('./helpers/generateError');
const { log } = require('../utils/debug');
const { comparePassword, createToken, hash } = require('./helpers/authHelpers');

const signUp = async (req, res) => {
    try {

        let { name, email, password } = req.body

        password = await hash(password)

        log(password)

        const user = await User.create({ name, email, password })

        const token = await createToken(user._id)

        log(user)

        res.status(201).json({ created: true, user, token })

    } catch (err) {

        const error = generateError(err)

        log(error)

        res.status(409).json({ created: false, error })
    }
}

const login = async (req, res) => {

    const { email, password } = req.body

    const userData = await User.findOne({ email: email })

    if (userData) {
        try {
            const isValid = await comparePassword(password, userData.password)

            if (isValid) {
                const token = await createToken(userData._id)
                res.status(201).json({ created: true, token })
            }

        } catch (err) {
            const error = generateError(err)
            res.status(401).json({ created: false, error })
        }
    } else {
        log("Account not found")
        const error = {
            email: "The email address is not valid"
        }
        res.status(404).json({ created: false, error })
    }
}

module.exports = { signUp, login }