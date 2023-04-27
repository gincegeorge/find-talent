const bcrypt = require('bcrypt')
const saltRound = process.env.BCRYPT_SALT_ROUND

const hash = async (text) => {
    try {
        const salt = await bcrypt.genSalt(saltRound);

        const hash = await bcrypt.hash(text, salt);

        return hash

    } catch (error) {
        console.log(error)
    }
}

module.exports = hash 