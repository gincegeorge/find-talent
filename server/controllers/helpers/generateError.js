const handleErrors = (err) => {
    let errors = { email: "", password: "" }

    if (err.code === 11000) {

        const keys = Object.keys(err.keyValue)

        console.log(keys);

        if (keys.includes('email')) {
            errors.email = "This email is already registered."
        } else if (keys.includes('phone')) {
            errors.phone = 'This phone number is already registered.'
        }

        return errors
    }
}

module.exports = handleErrors