const jwt = require("jsonwebtoken");
var config = require("../nodemon.json");

const bashelper =async(req,res,next)=> {
    try {
        var authorization = req.headers.authorization;
        if (authorization != undefined) {
            const token = authorization.split(" ")[1];
            // console.log(token);
            const decoded = await jwt.verify(token, config.secret);
            req.userData = decoded;
            next();
        }
        else {
            // console.log(error);
            return res.status(200).json({
                message: 'Auth failed'
            })

        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: 'Auth failed'
        })
    }
}

module.exports = bashelper;