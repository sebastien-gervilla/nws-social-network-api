import { CookieOptions, Response } from "express";

interface Cookie {
    name: string,
    value: string,
    options: CookieOptions
}

export default class ResponseHelper<T> {

    constructor(private _response: Response<T | undefined>) { }

    send(httpCode: number, message: string, data?: T) {
        this._response.statusCode = httpCode;
        this._response.statusMessage = message;

        return this._response.json(data);
    }

    setCookie(cookie: Cookie) {
        this._response.cookie(
            cookie.name,
            cookie.value,
            cookie.options
        );
    }

    clearCookie(key: string) {
        this._response.clearCookie(key);
    }

    get locals() {
        return this._response.locals;
    }
}