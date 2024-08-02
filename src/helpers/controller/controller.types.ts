import { Request, Response } from "express";

export type Route<DataType> = (request: Request, response: Response) => RouteReturn<DataType>

export type RouteReturn<DataType> = Promise<Response<DataType | undefined, Record<string, any>>>;