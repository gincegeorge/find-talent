const jwt = require('jsonwebtoken');

const createToken = async (id) => {

    const data = {
        id: id,
        date: new Date()
    }

    return await jwt.sign(data, process.env.JWT_SECRET_KEY)

}

module.exports = createToken

