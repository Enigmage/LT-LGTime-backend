import jwt from "jsonwebtoken";

export const createToken = (payloadValue) => {
    const payload = {
        user: {
            id: payloadValue,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100d' });
};

export const verifyToken = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth error" });
    try {
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        req.user = decodedToken.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Invalid Token or Expired token" });
    }
};
