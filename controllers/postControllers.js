import { PostModel } from "../models/index.js";
import axios from "axios";

export const fetchAll = async (_, res) => {
    try {
        const data = await PostModel.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};
export const createPost = async (req, res) => {
    // Create post for the given user.
    const { title, text, latitude, longitude } = req.body;
    let country = "India",
        postObject;
    axios
        .get(
            `http://api.positionstack.com/v1/reverse?access_key=${process.env.GEO_API_KEY}&query=${latitude},${longitude}`
        )
        .then((response) => {
            country = response.data.data[0].country;
        })
        .catch((_) => {
            console.log("Country can't be fetched");
        });
    if (req.file) {
        const { filename } = req.file;
        postObject = new PostModel({
            title: title,
            text: text,
            img: filename,
            country: country,
            latitude: latitude,
            longitude: longitude,
        });
    } else {
        postObject = new PostModel({
            title: title,
            text: text,
            country: country,
            latitude: latitude,
            longitude: longitude,
        });
    }
    try {
        await postObject.save();
        res.status(200).json({ message: "Post saved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Some error adding post" });
    }
}

export const deletePost = async (req, res) => {
    const delete_id = req.params.id;
    try {
        await PostModel.deleteOne({ _id: delete_id }, (err) => {
            if (!err) res.status(200).json({ message: "deletion successfull" });
            else res.status(400).json({ message: "Error while deleting" });
        });
    } catch (err) {
        console.log(err);
        res.staus(500).json({ message: "Could not delete" });
    }
};;
