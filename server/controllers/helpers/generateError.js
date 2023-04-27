const handleErrors = (err) => {
    let errors = { email: "", password: "" }

    if (err.code === 11000) {
        errors.email = "Email is already registerd!"
        return errors
    }
    return errors
}