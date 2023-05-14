const bizSchema = require("../models/bizSchema")
const { log } = require("../utils/debug")
const { hashPassword, createToken, comparePassword } = require("./helpers/authHelpers")
const generateError = require("./helpers/generateError")




const bizSignup = async (req, res) => {
    try {
        let { name, email, password } = req.body

        password = await hashPassword(password)
        log(password)

        const bizUser = await bizSchema.create({ name, email, password })

        const token = await createToken(bizUser._id)

        res.status(201).json({ created: true, bizUser, token })

    } catch (err) {
        const error = generateError(err)
        log(error)
        res.status(409).json({ created: false, error })
    }
}

const bizLogin = async (req, res) => {
    const { email, password } = req.body

    const userData = await bizSchema.findOne({ email: email })

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



module.exports = {
    bizSignup,
    bizLogin,
} 