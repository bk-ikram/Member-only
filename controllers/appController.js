const { validationResult } = require("express-validator");
const { genPassword } = require("../lib/passwordUtils");
const { insertUser } = require("../db/query");

exports.appGet = ( req, res) => {
    res.render("index", {
        title: "Dardish Homepage"
    });
};

exports.signupGet = ( req, res) => {
    res.render("signup", {
        title: "Welcome to our Community"
    });
};

exports.signupPost = async( req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.errors = errors.array;
            res.render("signup",{
                title: "Registration Failed",
                errors: errors.array(),
                userInput: req.body,
            })
        }
        else {
            const { username, firstname, lastname, password } = req.body;
            //generate hashed password
            const hashedPassword = await genPassword(password);
            console.log(hashedPassword);
            //need to insert user into the db
            await insertUser(username, firstname, lastname,hashedPassword);
            //render the register page again, with success value
            res.render("signup",{
                title: "Registration Successful",
                success: true,
            })
        }
    }
    catch (err) {
        next(err);
    }
};