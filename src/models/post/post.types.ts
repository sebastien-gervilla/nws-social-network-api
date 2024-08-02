import Mongoose from 'mongoose';
import { UserModel } from '../user';

export interface PostModel extends Mongoose.Document {
    content: string;
    images: {
        url: string;
    }[];
    createdBy: UserModel;
}