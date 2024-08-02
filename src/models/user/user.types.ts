import Mongoose from "mongoose";

export interface UserModel extends Mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    posts: {
        content: string;
        images?: {
            buffer: Buffer;
            contentType: String;
        }[];
    }[];
}