const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');

exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(username.trim(), email.trim(), hashedPassword);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User ${username} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                res.status(200).send({
                    status: 'success',
                    data: {
                        id: data.id,
                        username: data.username
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect Credential'
            });
        }
    });

}