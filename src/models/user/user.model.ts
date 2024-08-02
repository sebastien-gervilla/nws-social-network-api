import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from '@/configuration/environment';
import { UserModel } from './user.types';

const UserSchema = new Mongoose.Schema<UserModel>({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    posts: [{
        content: String,
        images: [{
            buffer: Buffer,
            contentType: String
        }]
    }]
}, {
    timestamps: true,
});

const User = Mongoose.model<UserModel>("User", UserSchema, "users");
export { User };