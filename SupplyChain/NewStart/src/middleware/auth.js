const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRETE_KEY);
        // console.log(verifyUser);

        const user = await Register.findOne({ _id: verifyUser._id });
        // console.log(user.name);

        req.token = token;
        req.user = user;

        next();

    } catch (error) {
        res.render("login");
        // res.status(401).send(error);
    }
}

module.exports = auth;