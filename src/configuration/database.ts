import Mongoose from 'mongoose';
import { environment } from './environment';

export const initializeDatabaseConnection = async () => {
    const { nodeEnv, databaseUri } = environment;
    if (nodeEnv === 'test') return;

    try {
        if (!databaseUri)
            throw new Mongoose.MongooseError("Database URI not provided.");

        Mongoose.set('strictQuery', true);
        await Mongoose.connect(databaseUri);
        console.log("🍃 Database successfully connected");
    } catch (error) {
        console.log("Database connection error.\n" + error);
    }
}