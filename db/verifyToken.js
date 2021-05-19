const jwt = require("jsonwebtoken");
const secretKey = require("./secretKey");

function verifyToken(req, res, next) {
    if (req.headers["authorization"] === undefined)
        return res.status(403).send({ auth: false, message: "No token provided." });

    const token = req.headers["authorization"].split(" ")[1];
    if (!token)
        return res.status(403).send({ auth: false, message: "No token provided." });

    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            console.log(err);
            return res
                .status(500)
                .send({ auth: false, message: "Failed to authenticate token." });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;