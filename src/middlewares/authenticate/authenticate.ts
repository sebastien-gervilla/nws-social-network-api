import { NextFunction, Request, Response } from "express";
import { models } from '@/models';

export const authenticate = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { token } = request.cookies;
        if (!token) return response.status(401).send("Unauthorized");

        const googleResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);

        if (googleResponse.status !== 200)
            return response.status(401).send("Unauthorized");

        const body: any = await googleResponse.json();
        if (!body?.sub) return response.status(401).send("Unauthorized");

        const user = await models.user.findOne({ id: body.sub });
        if (!user) return response.status(401).send("Unauthorized");

        response.locals.user = user;

        return next();
    } catch (error) {
        console.log(error);
        return response.status(500).send("Server error");
    }
}