import mongoose from "mongoose";

export const initiateDatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Database");
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { UserModel } from "./user.js";
export { PostModel } from "./post.js"
