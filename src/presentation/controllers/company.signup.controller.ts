import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http.helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class CompanySignUpController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }
    if (!httpRequest.body.country) {
      return badRequest(new MissingParamError("country"));
    }
    if (!httpRequest.body.cnpj) {
      return badRequest(new MissingParamError("cnpj"));
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError("password"));
    }
    if (!httpRequest.body.passwordConfirmation) {
      return badRequest(new MissingParamError("passwordConfirmation"));
    }
    return {
      statusCode: 200,
      body: "",
    };
  }
}
