const {getUser} = require('../utils/auth.utils');
const restrictToLoginUserOnly =(req, res, next)=>{
    const userUid = req.headers["authorization"];
    if(!userUid){
        return res.status(400).json("Not Authorized User or Login First");
    }
    const token = userUid.split("Bearer ")[1];
    const user = getUser(token);
    if(!user){
        return res.status(400).json("Not Authorized User or Login First");
    }
    req.user = user;
    next();
}

module.exports = {restrictToLoginUserOnly};