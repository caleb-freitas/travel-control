import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";

export interface IMiddleware {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
