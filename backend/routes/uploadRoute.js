import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname.split(".")[0]}-${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
});

aws.config.update({
    accessKeyId: config.ACCESS_KEY_ID,
    secretAccessKey: config.SECRET_ACCESS_KEY,
    region: "us-west-2",
});

const s3 = new aws.S3();
const storageS3 = multerS3({
    s3,
    bucket: config.S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
        cb(null, `${file.originalname.split(".")[0]}-${Date.now()}.jpg`);
    },
});

const uploadS3 = multer({ storage: storageS3 });

router.post("/s3", uploadS3.single("image"), (req, res) => {
    res.send(req.file.location);
});

export default router;