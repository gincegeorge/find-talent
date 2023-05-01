const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = process.env.BCRYPT_SALT_ROUND



const createToken = (id) => {

    const data = {
        id: id,
        date: new Date()
    }

    return jwt.sign(data, process.env.JWT_SECRET_KEY)

}

const hash = async (text) => {
    try {
        const salt = await Bcrypt.genSalt(saltRound);

        const hash = await Bcrypt.hash(text, salt);

        return hash

    } catch (error) {
        console.log(error)
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


module.exports = {
    createToken,
    hash,
    comparePassword
}