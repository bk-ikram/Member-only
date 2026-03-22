const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const { pool } = require("./db/setup/connections");
const pgSession = require('connect-pg-simple')(session);
const appRouter = require("./routes/appRouter");

require('dotenv').config();

/** -------------   GENERAL SETUP   -------------  **/

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** -------------   SESSION SETUP   -------------  **/

//add session store
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    createTableIfMissing: true,
    store: new pgSession({
        pool: pool
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } //30 days
}));

app.use(passport.session());

/** ----------   PASSPORT AUTHENTICATION   ----------- **/

require("./config/passport");

app.use(passport.session());

    //for debugging
app.use((req, res, next) => {
    console.log(`session: ${req.session}`);
    console.log(`user: ${req.user}`);
    next();
})

/** -------------------   ROUTERS   -------------------- **/
app.use("/", appRouter);


/** -------------------   SERVER   -------------------- **/
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //TODO
  //res.render('error');
  console.log(err.message);
  res.send("Something went wrong.");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT,(error)=>{
    if(error)
        throw error;
    console.log(`App is listening at port ${PORT}`);
});