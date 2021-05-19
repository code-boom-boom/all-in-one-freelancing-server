const User = require("../db/models/user-model");
const bcrypt = require("bcryptjs");

const validateRegisterInput = require("../validations/register");

const createUser = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            success: false,
            error: "Email already exists"
        });
    } else {
        const newUser = new User(req.body);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then((user) => res.json(user))
                    .catch((err) => console.log(err));
            });
        });
    }
};

module.exports = {
    createUser
};