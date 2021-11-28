const jwt = require("jsonwebtoken");
const User = require("../Model/registerSchema")

const auth = async(req,res,next) =>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({_id:verifyUser._id})
        res.locals.User = user;
        next();
    }catch(err){
        console.log(err);
    }
}
module.exports = auth ;
