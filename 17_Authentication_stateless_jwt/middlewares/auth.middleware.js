const {getUser} = require('../utils/auth.utils');
const restrictToLoginUserOnly =(req, res, next)=>{
    const userUid = req.cookies.uid;
    const user = getUser(userUid);
    if(!userUid || !user){
        return res.status(400).json("Not Authorized User or Login First");
    }
    req.user = user;
    next();
}

module.exports = {restrictToLoginUserOnly};