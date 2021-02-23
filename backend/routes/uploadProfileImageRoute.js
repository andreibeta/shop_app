import multer from 'multer';
import express from 'express';
import { isAuth } from '../util.js';

const uploadProfileImagesRoute = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads-profile/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadProfileImagesRoute.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadProfileImagesRoute;