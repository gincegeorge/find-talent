const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('../../utils/debug');
const saltRound = process.env.BCRYPT_SALT_ROUND
const user = require('../../models/userSchema');


const createToken = (id) => {
    const data = {
        id: id,
        date: new Date()
    }
    return jwt.sign(data, process.env.JWT_SECRET_KEY)

}

const hashPassword = async (text) => {
    try {
        const salt = await Bcrypt.genSalt(saltRound);
        const hash = await Bcrypt.hash(text, salt);
        return hash
    } catch (error) {
        throw new Error(error)
    }
}


const comparePassword = async (Enteredpassword, dbPassword) => {
    const validPassword = await Bcrypt.compare(Enteredpassword, dbPassword)
    if (validPassword) {
        return true
    } else {
        throw new Error('Invalid password')
    }
}

/**
 * @param {string} jwtToken
 * @returns {boolean} 
 */
const verifyJWT = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        try {
            const userData = await user.findOne({ _id: decoded.id })
            if (userData) {
                return true
            } else {
                throw new Error(`Could not find user`)
            }
        } catch (error) {
            log(error)
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}


module.exports = {
    createToken,
    hashPassword,
    comparePassword,
    verifyJWT
}