module.exports.isAuth = ( req, res, next ) => {
    if(req.isAuthenticated()){
        next();
    }
    else {
        res.status(401).send('You are not authorized to view this resource.');
    }

}

module.exports.isAdmin = ( req, res, next ) => {
    if(req.user.isAdmin){
        next();
    }
    else {
        res.status(401).send('You are not authorized to view this resource because you are not an admin.');
    }
}