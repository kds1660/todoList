module.exports  = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    } else {
        (res.status(403).send({message:'Access to this route denied'}));
    }
};