import { MongooseError, Error } from "mongoose";
import { Request } from "express";
import { Response } from "../response";
import { Route, RouteReturn } from "./controller.types";

export default class ControllerHelper {
    static route = <DataType>(routeFn: RouteFn<DataType>): Route<DataType> => {
        return async (req, res) => {
            const response = new Response(res);

            try {
                return await routeFn(req, response);
            } catch (error) {
                console.log(error);

                if (error instanceof Error)
                    return ControllerHelper.handleError(error, req, response);

                return response.send(500, 'Server error.');
            }
        }
    }

    static handleError<T>(error: Error, request: Request, response: Response<T>) {
        console.log(
            'Error on api request.\n',
            `\t- method: ${request.method}\n`,
            `\t- url: ${request.originalUrl}\n`,
            `\t- type: ${error.name}\n`
        );

        if (error instanceof Error.ValidationError)
            return ControllerHelper.handleValidationError(error, response);

        if (error instanceof MongooseError)
            return ControllerHelper.handleMongooseError(error, response);

        return response.send(500, 'Server error.');
    }

    static handleMongooseError<T>(error: MongooseError, response: Response<T>) {
        return response.send(500, 'Server error.');
    }

    static handleValidationError<T>(error: Error.ValidationError, response: Response<T>) {
        const entries = Object.entries(error.errors);
        const firstError = entries[0][1];
        if (firstError instanceof Error.ValidatorError)
            return response.send(400, firstError.properties.message);

        return response.send(400, 'Wrong input.');
    }
}

type RouteFn<DataType> = (request: Request, response: Response<DataType>) => RouteReturn<DataType>