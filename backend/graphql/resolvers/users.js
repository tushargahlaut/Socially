const User= require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const {SECRET_KEY}  = require("../../config");
const {validateRegisterInput} = require("../../util/validators")
const {validateLoginInput} = require("../../util/validators")
const {UserInputError} = require("apollo-server");

function generateToken(res){
    return jwt.sign({
        id:res.id,
        email:res.email,
        username:res.username
    },SECRET_KEY);
}

module.exports = {
    Mutation : {
        async login(_,{username,password}){
            const {errors,valid} = validateLoginInput(username,password);
            console.log(errors);
            const user = await User.findOne({username});
            if(!user){
                errors.general = "User not Found";
                throw new UserInputError("User Not Found",{errors});

            }
            const match = await bcrypt.compare(password,user.password);
            if(!match){
                errors.general = "Wrong Credentials";
                throw new UserInputError("Wrong Credentials",{errors});
            }
            const token = generateToken(user);
            return{
                ...user._doc,
                id : user._id,
                token
            }
        },
        async register(_,{registerInput : {username,email,password,confirmPassword}},context,info){
            //Validate User Data
            const {valid,errors} = validateRegisterInput(username,email,password,confirmPassword);
            if(!valid){
                throw new UserInputError("Errors",{errors});
            }
            //Makesure user doesn't already exists
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError("Username is taken",{
                    errors:{
                        username : "This Username is Taken"
                    }
                });
            }
            password = await bcrypt.hash(password,12);
            const newUser = new User({
                email,username,password,createdAt : new Date().toISOString()
            });
            const res = await newUser.save();
            const token = generateToken(res);

            return{
                ...res._doc,
                id : res._id,
                token
            };
        }
    }
}