import { config } from "dotenv";

config();

export const environment = {
    nodeEnv: process.env.NODE_ENV,
    apiPort: process.env.API_PORT,
    databaseUri: process.env.DATABASE_URI,
    allowedOrigin: process.env.ALLOWED_ORIGIN,
}