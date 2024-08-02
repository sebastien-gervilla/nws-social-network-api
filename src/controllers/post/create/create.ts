import { models } from '@/models';
import { Controller } from "@/helpers/controller";
import { Requests } from '@/interfaces/requests';
import { PostModel } from '@/models/post';
import { UserModel } from '@/models/user';

export const create = Controller.route(async (request, response) => {

    const user: UserModel = response.locals.user;
    if (!user) return response.send(401, "Unauthorized");

    const post: Requests.Post.Create = request.body;
    if (!post.content)
        return response.send(400, "Invalid post, no content");

    const files = request.files;

    const images: PostModel['images'] = [];
    if (files?.length) {
        // @ts-ignore
        for (const file of files)
            images.push({
                url: `/uploads/${file.filename}`
            });
    }

    await models.post.create({
        content: post.content,
        images,
        createdBy: user
    });

    return response.send(201, 'Success');
});