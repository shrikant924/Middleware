const usmEmail = require('../models/usmEmail.model');
const usmPass = require('../models/usmPassword.model');
const usmFullname = require('../models/usmFullname.model');
const mongoose = require('mongoose');
const { response } = require('express');
var jwt = require('jsonwebtoken');

// Insert all data with a shared user ID
exports.usmRegister = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        // Generate a shared user_id using ObjectId
        const user_id = new mongoose.Types.ObjectId();
        email = email.toLowerCase();
        // Insert into 3 different collections with same user_id
        const insertedEmail = await usmEmail.create({ user_id, email });
        const insertedPass = await usmPass.create({ user_id, password });
        const insertedName = await usmFullname.create({ user_id, fullname });

        res.status(201).json({
            message: "User data inserted successfully",
            email: insertedEmail,
            password: insertedPass,
            fullname: insertedName
        });

    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    // let user_id = '';
    // let user = '';
    try {
        const { email, password } = req.body;
        // console.log(email);
        // user = await usmEmail.findOne({ email: `${email}` }).then(response => {
        //     res.json(response);
        //     user_id = response.user_id;
        // })
        // if (!user) {
        //     const { password } = req.body;
        //     const idString = user_id.toString();
        //     const input = "new ObjectId('689100d83615121b5d28a8f7')";
        //     const trimmed = input.replace("new","");
        //     console.log(trimmed);
        //     const pass = await usmPass.find({ user_id: `${trimmed}` });
        //     console.log(pass);
        // }
        // res.status(200).json(user);

        const userDetails = await usmEmail.aggregate([
            {
                $lookup: {
                    from: "usm_fullnames",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "result"
                }
            },
            { $unwind: "$result" },
            {
                $lookup: {
                    from: "usm_passwords",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "result2"
                }
            },
            { $unwind: "$result2" },
            {
                $project: {
                    _id: 1, // optional: remove MongoDB _id
                    email: 1,
                    fullname: "$result.fullname",
                    password: "$result2.password"
                }
            }
        ]);

        const user = await userDetails.find(u => u.email == email);
        console.log(user)
        // res.json(response);
        if (!user) {
            res.json({ message: "User email id not found!!" });
        }
        else {
            if (user.password !== password) {
                res.json({ message: "password is incorrect!!" });
            }
            else {
                const token = jwt.sign({ id: user._id }, "mySecretKey")
                res.json({
                    message: "User has been logged in successfully",
                    token: token,
                    isLoggedIn: true
                })
            }
        }


    } catch (err) {

    }
}