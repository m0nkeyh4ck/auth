const User = require('../models/user.model');

class UserValidation {
    static checkEmail(req, res, next) {
        const { email } = req.body;
        User.findByEmail(email, (_, data) => {
            if (data) {
                res.status(400).send({
                    status: 'error',
                    message: `El correo '${email}' ya se encuentra registrado`
                });
                return;
            }
            next();
        });
    }

    static checkUsername(req, res, next) {
        const { username } = req.body;
        User.findByUsername(username, (_, data) => {
            if (data) {
                res.status(400).send({
                    status: 'error',
                    message: `El usuario '${username}' ya existe`
                });
                return;
            }
            next();
        });
    }
}

module.exports = UserValidation;
