const sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    validationResult
} = require("express-validator");
const db = require("../connexion");
const {
    user
} = require("../models/user");


/* ---------- Creation user -----------------*/
exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    };

    user
        .create({
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: req.body.password,
        })
        .then((user) => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
};

/*-------------------- Connexion user -------------*/
exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    User.findOne({
            email: req.body.email,
        })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: "Mot de passe incorrect !",
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                                userId: user._id,
                            },
                            "2700549958242410746f88bdb4c763cfa60045fd", {
                                expiresIn: "24h",
                            }
                        ),
                    });
                })
                .catch((error) =>
                    res.status(500).json({
                        error,
                    })
                );
        })
        .catch((error) =>
            res.status(500).json({
                error,
            })
        );
};