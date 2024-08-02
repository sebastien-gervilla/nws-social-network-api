import Mongoose from 'mongoose';
import { PostModel } from './post.types';

const PostSchema = new Mongoose.Schema<PostModel>({
    content: String,
    images: [],
    createdBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

const Post = Mongoose.model<PostModel>("Post", PostSchema, "posts");
export { Post };