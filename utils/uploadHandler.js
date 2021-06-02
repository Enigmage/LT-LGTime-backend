import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const fileFilter = function (req, file, cb) {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/raw",
        "image/pjpeg",
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        cb(new Error("Only images are allowed."));
    }
};
const limit = {
    fileSize: 200000, // Max size 200kb.
};

const options = {
    storage: storage,
    limits: limit,
    fileFilter: fileFilter,
};

export const uploadHandler = multer(options).single("image");
