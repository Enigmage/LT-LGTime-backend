import { Router } from "express";
import {fetchAll, createPost, deletePost} from "../controllers/index.js";
import { verifyToken, uploadHandler } from "../utils/index.js";

export const router = Router();

// query all posts. Send as json object.
router.get("/all", fetchAll);

// create post after verifying token and uploading file if any.
router.post("/create", verifyToken, uploadHandler, createPost);

// delete post of the given id.
router.delete("/delete/:id", verifyToken, deletePost);
