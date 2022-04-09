import { ILoadAccountByToken } from "@/domain/usecases";
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from "@/presentation/protocols";

import { AccessDeniedError } from "../errors";
import { forbidden, ok, serverError } from "../helpers";

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly adminRole?: string
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.["x-access-token"];
      if (!accessToken) {
        return forbidden(new AccessDeniedError());
      }
      const { role, account } = await this.loadAccountByToken.load(accessToken);
      console.log(account);
      if (!account) {
        return forbidden(new AccessDeniedError());
      }
      if (role !== this.adminRole) {
        return forbidden(new AccessDeniedError());
      }
      return ok({ company_id: account.id });
    } catch (error) {
      return serverError(error);
    }
  }
}
