const jwt = require('jsonwebtoken');
const secret = "Abhishek12345678*@#$*";

const setUser = (user) =>{
    const payload = {
        _id:user._id,
        email:user.email,
    }
    return jwt.sign(payload, secret);
}

const getUser = (token) =>{
    if(!token){
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {setUser, getUser};