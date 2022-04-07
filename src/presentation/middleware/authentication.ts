import { ILoadAccountByToken } from "@/domain/usecases";
import { AccessDeniedError } from "@/presentation/errors";
import { forbidden, ok, serverError } from "@/presentation/helpers";
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from "@/presentation/protocols";

export class AuthenticationMiddleware implements IMiddleware {
  constructor(private readonly loadAccountByToken: ILoadAccountByToken) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.["x-access-token"];
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken);
        if (account) {
          return ok({ accountId: account.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
