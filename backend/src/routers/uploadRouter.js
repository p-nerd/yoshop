import { Router } from "express";
import multer from "multer";
import path from "path";

const uploadRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./../uploads/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const checkFileType = (file, cp) => {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cp(null, true);
    } else {
        cp("Images only");
    }
};

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cp);
    },
});

uploadRouter.post("/", upload.single("image"), (req, res) => {
    return res.status(201).json({ imagePath: `${req.file.path}` });
});

export default uploadRouter;
