"use strict";

const resetDB = require("../config/scripts/populateDB")

const Rating = require("./schema/Rating");
const User = require("./schema/User");

const express = require("express");
const router = express.Router();

require("dotenv").config()
const jwt = require("jsonwebtoken");


// completely resets your database.
// really bad idea irl, but useful for testing
router.route("/reset")
    .get((_req, res) => {
        resetDB(() => {
            res.status(200).send({
                message: "Data has been reset."
            });
        });
    });

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "Welcome to the Over-Rated database!"
        });
    });

router.route("/users")
    .get((_req, res) => {
        console.log("GET /users");
        const users = User.find({})
        .then(users => {
            res.status(200).send({users});
        });

    });

router.route("/login")
    .post(async (req, res) => {
        console.log("POST /login");
        const username = req.body.username;
        const password = req.body.password;

        // Query for user and if authenticated, return jwt
        if (!username || !password) {
            res.status(400).send({
                "message" : "Bad Request."
            });
            return;
        }

        var user = await User.findOne({username: username});
        console.log(user);

        if (!user || user.password != password){
            res.status(400).send({
                "message" : "Incorrect username or password"
            })
            return;
        }
        var token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '600s' }
        );

        res.status(200).send({
            accessToken : token
        });

    });

router.route("/signup")
    .post(async (req, res) => {
        console.log("POST /signup");
        const username = req.body.username;
        const password = req.body.password;
        const name = req.body.name;

        if (!username || !password || !name){
            res.status(400).send({
                "Message" : "Missing required fields."
            });
            return;
        }
        else{
            var existingUser = await User.findOne({"username" : username});
            if (existingUser){
                res.status(400).send({
                    "Message" : "Username already exists"
                });
                return;
            }
            var user = {
                username : username,
                password: password,
                name: name
            };
            if (req.body.bio){
                user.bio = req.body.bio;
            }
            User.create(user).save()
            .then(newUser => {
                res.status(201).send(newUser);
            })
        }

    })


module.exports = router;
