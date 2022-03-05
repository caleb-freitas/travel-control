import { IHttpResponse } from "../protocols/http";

export function badRequest(error: Error): IHttpResponse {
  return {
    statusCode: 400,
    body: error,
  };
}
