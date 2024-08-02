import { models } from '@/models';
import { Controller } from "@/helpers/controller";
import { getDaysAfter } from '@/utils/date-utils';

export const login = Controller.route(async (request, response) => {

    const { code } = request.body;
    if (!code) return response.send(401, "Unauthorized");

    const googleResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${code}`);

    if (googleResponse.status !== 200)
        return response.send(401, 'Unauthorized');

    const body: any = await googleResponse.json();
    if (!body?.email) return response.send(401, 'Unauthorized');

    const user = await models.user.findOne({ email: body.email });
    if (!user) return response.send(401, 'Unauthorized');

    response.setCookie({
        name: 'token',
        value: code,
        options: {
            httpOnly: true,
            expires: getDaysAfter(15),
            path: '/'
        }
    });

    return response.send(204, 'Success');
});