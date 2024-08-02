import { Controller } from "@/helpers/controller";

export const current = Controller.route(async (_, response) => {

    const user = response.locals.user;
    if (!user) return response.send(401, "Unauthorized");

    return response.send(200, "Success", user);
});