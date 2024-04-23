import { Router } from "express";
import { postImage } from "../controllers/uploadImage";

const router = Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post("/upload-image", upload.single('image'),postImage);

export default router;