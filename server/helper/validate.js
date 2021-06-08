module.exports.validateLogin = (username, password) => {

        validate: Object.keys(errors).length > 0
    }
}

module.exports.validateRegister = (email,password,confirmPassword,username) => {
    const errors = {}

    return {
        errors,
        validate: Object.keys(errors).length > 0
    }
}
