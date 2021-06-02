import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import { Router } from "express";
import { UserModel } from "../models/index.js";
import { createToken } from "../utils/index.js";

export const router = Router();

router.post(
    "/signup",
    [
        check("username", "Please enter username").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter password").isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation Error !!",
            });
        }
        const { username, email, password } = req.body;
        try {
            const checkUser = await UserModel.findOne({
                email,
            });
            if (checkUser) {
                res.status(400).json({
                    message: "User already exists",
                });
            }
            const user = new UserModel({
                username,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const token = createToken(user.id);
            res.status(200).json({ token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error in signing up" });
        }
    }
);

router.post(
    "/login",
    [
        check("email", "Please enter valid email").isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: "Invalid email or password" });
        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email });
            if (!user)
                return res
                    .status(400)
                    .json({ message: "User does not exist !!" });
            const checkPass = await bcrypt.compare(password, user.password);
            if (!checkPass)
                return res.status(400).json({ message: "Incorrect password" });
            const token = createToken(user.id);
            res.status(200).json({ token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Cannot Log In" });
        }
    }
);

// router.get("/get_user", verifyToken, async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.user.id);
//         res.json(user);
//     } catch (e) {
//         res.send({ message: "Error in Fetching user" });
//     }
// });
