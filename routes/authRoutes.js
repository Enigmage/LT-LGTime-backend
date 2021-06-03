import { check } from "express-validator";
import { Router } from "express";
import { signupUser, loginUser } from "../controllers/index.js";

export const router = Router();

router.post(
    "/signup",
    [
        check("username", "Please enter username").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter password").isLength({ min: 8 }),
    ],
    signupUser
);

router.post(
    "/login",
    [check("email", "Please enter valid email").isEmail()],
    loginUser
);

// router.get("/get_user", verifyToken, async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.user.id);
//         res.json(user);
//     } catch (e) {
//         res.send({ message: "Error in Fetching user" });
//     }
// });
