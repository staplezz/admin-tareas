// Revisa si el usuario está loggeado.
module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}