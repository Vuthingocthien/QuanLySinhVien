const { default: mongoose } = require("mongoose");
const {ResponseCode, ResponseMessage} = require("../constans/response_code");
const BaseRessponse = require("../interfaces/response.interface");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {use} = require("../routes/api.route");
const User = require("../models/users.models");

const AuthController ={
    signin: async (req, res, next)=>{
        let body = req.body;
        let user = await User.findOne({username: body.username});
        if(!user){
            res.status(404).json(new BaseRessponse(ResponseCode.USER_NOT_EXISTED, ResponseMessage.USER_NOT_EXISTED));
            return;
        }
        let pwdInDb = user.password;
        let pwd = body.password;
        if(!bcrypt.compareSync(pwd, pwdInDb)){
            return res.status(401).json(new BaseRessponse(ResponseCode.UNAUTHORIZED, ResponseMessage.UNAUTHORIZED));

        }
        let token = AuthController.generateToken({username: user.username, hashed: pwdInDb});
        res.json(new BaseRessponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL, {token}));
        
    },
    generateToken: (data)=>{
        try {
            return jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRED_IN})
        } catch (error) {
            console.log(e);
            return '';
        }
    },
    restrictTo: (...roles)=>{
        return (req, res, next)=>{
            try {
                if(!roles.includes(req.user.roles)){
                  return res.status(403).json(new BaseRessponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN));
                }
                next();
            } catch (error) {
                console.log(e);
                
            }

        }

    }
}
module.exports = AuthController;