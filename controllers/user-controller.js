let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

router.post("/add", function (req, res) {
    let username = req.body.user.username;
    let password = req.body.user.password;
    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(password, 10)
    }).then(
        function createSuccess(user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
            res.json({
                user: user,
                message: "Identity crisis averted.",
                sessionToken: token
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.post("/login", function (req, res) {
    User.findOne({ where: { username: req.body.user.username } })
        .then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                        if (matches) {
                            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                            res.json({
                                user: user,
                                message: "Right this way, Sir.",
                                sessionToken: token
                            })
                        } else {
                            res.status(502).send({ error: "Please provide valid credentials." })
                        }
                    })
                } else {
                    res.status(500).send({ error: "You are not on the list." })
                }
            },
            function (err) {
                res.status(501).send({ err: "We're sorry, but due to bureaucratic BS, all tech must fail at random times for no reason." })
            }
        )
})

module.exports = router