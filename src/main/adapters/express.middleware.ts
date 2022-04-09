import { IMiddleware, IHttpRequest } from "@/presentation/protocols";
import { NextFunction, Request, Response } from "express";

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: request.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      if (!httpResponse.body?.company_id) {
        next();
      }
      Object.assign(request.body, httpResponse.body);
      next();
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
