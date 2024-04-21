const jwt = require('jsonwebtoken');
const secret = "Abhishek12345678*@#$*";

const setUser = (user) =>{
    const payload = {
        _id:user._id,
        name:user.fullName,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role
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