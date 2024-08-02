// Default imports
import express from 'express';

// Controller imports
import { controllers } from '@/controllers';
import { middlewares } from '@/middlewares';

const Router = express.Router();

Router.get('/current', middlewares.authenticate, controllers.user.current);
Router.post('/register', controllers.user.register);
Router.post('/login', controllers.user.login);

export default Router;