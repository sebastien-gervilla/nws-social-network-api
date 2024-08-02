// Default imports
import express from 'express';
import multer from 'multer';

// Controller imports
import { controllers } from '@/controllers';
import { middlewares } from '@/middlewares';

const Router = express.Router();

// File uploading
const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, 'uploads/'),
    filename: (_, file, cb) => cb(null, crypto.randomUUID() + '_' + file.originalname)
});

const upload = multer({ storage });

// Routes
Router.get('/', middlewares.authenticate, controllers.post.get);
Router.post('/', middlewares.authenticate, upload.array('image'), controllers.post.create);

export default Router;