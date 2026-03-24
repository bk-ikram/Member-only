const { body } = require("express-validator");
require('dotenv').config();

const emptyMsg = "cannot be empty";
const lengthMsg = "should be between 5 and 30 characters";

module.exports.signupValidation = [
    body("firstname")
        .trim()
        .notEmpty()
        .withMessage("First name " + emptyMsg)
        .isLength({min: 5, max: 30})
        .withMessage("First name " + lengthMsg),
    body("lastname")
        .trim()
        .notEmpty()
        .withMessage("Last name " + emptyMsg)
        .isLength({min: 5, max: 30})
        .withMessage("Last name " + lengthMsg),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username " + emptyMsg)
        .isLength({min: 4, max: 30})
        .withMessage("Username " + lengthMsg),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password " + emptyMsg)
        .isLength({min: 5, max: 30})
        .withMessage("Password " + lengthMsg),
    body("conf-password").custom((value, { req }) => {
        console.log("form body is ",JSON.stringify(req.body));
        console.log(value, req.body.password);
        if (value !== req.body.password) throw new Error("Password did not match");
        return true;
    }),
];

module.exports.messageValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title " + emptyMsg)
        .isLength({min: 1, max: 100})
        .withMessage("Title should be between 1 and 100 characters"),
    body("message")
        .trim()
        .notEmpty()
        .withMessage("message " + emptyMsg)
        .isLength({min: 1, max: 200})
        .withMessage("Message should be between 1 and 200 characters")
]

module.exports.membershipValidation = [
    body("membership_secret")
        .trim()
        .custom((value, { res }) => {
        if (value.toLowerCase() !== process.env.MEMBERSHIP_SECRET){
            console.log("redirecting to membership_failed=true");
            res.redirect("/?membership_failed=true");
        };
        return true;
        })
]