const User = require('../../models/userSchema')

const doLogin = async (email, password) => {
    try {
        const userData = await User.findOne({ email: email })
        console.log(userData)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    doLogin
}