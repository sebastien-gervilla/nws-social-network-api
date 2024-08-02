// Configuration
import './configuration/aliases';
import { environment } from './configuration/environment';
import { initializeDatabaseConnection } from './configuration/database';

// Default imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Router imports
import { routes } from './routes';
import path from 'path';

export const initializeServer = async () => {
    console.log("===================================================");
    const { apiPort, allowedOrigin } = environment;

    // Database Connection
    await initializeDatabaseConnection();

    // Server setup
    const app = express();

    // Images
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // Middlewares
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors({
        origin: [
            allowedOrigin!
        ],
        credentials: true
    }));

    // Routes
    app.use('/user', routes.user);
    app.use('/post', routes.post);

    // Running server
    const server = app.listen(apiPort, () => {
        console.log(`\x1b[33m⚡️ Server is running at http://localhost:${apiPort}\x1b[0m`);
    });

    return {
        app,
        server
    }
}

initializeServer();