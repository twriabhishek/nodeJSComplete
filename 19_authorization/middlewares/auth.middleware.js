const {getUser} = require('../utils/auth.utils');

const checkForAuthentication=(req, res, next)=>{
    req.user=null;
    const authorizationHeaderValue = req.headers["authorization"];
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')){
        return next();
    }
    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);
    if(!user){
        return res.status(400).json("Not Authorized User or Login First");
    }
    req.user = user;
    return next();
}


module.exports = {checkForAuthentication};