module.exports.validateLogin = (username, password) => {
    const errors = {}
    if(username.trim() === "") {
        errors.username = "Введите имя пользователя,поле не может быть пустым"
    }
    if(password.trim() === "") {
        errors.password = "Введите пвраль пользователя он не может быть пустым"
    }
    return {
        errors,
        validate: Object.keys(errors).length > 0
    }
}

module.exports.validateRegister = (email,password,confirmPassword,username) => {
    const errors = {}
    if(email.trim() === "") {
        errors.email = "Введите email пользователя"
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
             errors.email = "Пожалуйста Введите коректный Email ";
        }
    }
    if(username.trim() === "") {
        errors.username = "Имя пользователя не может быть пустым,Введите имя пользователя"
    }
    if(password.trim() === "") {
        errors.password = "Пароль не может быть пустым,Введите пвраль пользователя"
    }else  if(confirmPassword.trim() !== password) {
        errors.confirmPassword = "Пвраль не совпадает, Введи правельный пароль"
      }
    return {
        errors,
        validate: Object.keys(errors).length > 0
    }
}