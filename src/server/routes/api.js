const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb+srv://dbAdmin:karasik@cluster0-bgkyi.mongodb.net/jsHSE";

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    if (err) {
        console.error('Ошибка!' + err);
    } else {
        console.log('Успешно!');
    }
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = {
                subject: registeredUser._id
            };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({
                token
            });
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({
        email: userData.email
    }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Неправильный email');
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Неправильный пароль');
            } else {
                let payload = {
                    subject: user._id
                };
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }
    });
});

module.exports = router;
