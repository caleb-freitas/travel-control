import { IAuthentication } from "@/domain/usecases";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from "@/presentation/protocols";

import { badRequest, ok, serverError, unauthorized } from "../helpers";

export class LoginController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly dbAuthentication: IAuthentication
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password, role } = httpRequest.body;
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const token = await this.dbAuthentication.auth({
        email,
        password,
        role,
      });
      if (!token) {
        return unauthorized();
      }
      return ok(token);
    } catch (error) {
      return serverError(error);
    }
  }
}
