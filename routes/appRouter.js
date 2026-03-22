const { Router } = require('express');
const appRouter = Router();
const appController = require("../controllers/appController");
const { signupValidation } = require("../middleware/validation");

//universal
appRouter.use((req, res, next) => {
    if (req.user) res.locals.user = req.user;
    next();
})

//homepage
appRouter.get("/",appController.appGet);

//signup
appRouter.get("/signup",appController.signupGet);

appRouter.post("/signup"
                ,signupValidation
                ,appController.signupPost);

//login
//register
//new-message

module.exports = appRouter;