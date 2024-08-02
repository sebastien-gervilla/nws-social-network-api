import { models } from '@/models';
import { Controller } from "@/helpers/controller";

export const get = Controller.route(async (_, response) => {

    const posts = await models.post
        .find()
        .populate('createdBy');

    return response.send(200, 'Success', posts);
});