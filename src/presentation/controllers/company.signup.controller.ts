import { InvalidParamError } from "../errors";
import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http.helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class CompanySignUpController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields: string[] = [
      "name",
      "email",
      "country",
      "cnpj",
      "password",
      "passwordConfirmation",
    ];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return badRequest(new InvalidParamError("passwordConfirmation"));
    }
    return {
      statusCode: 200,
      body: "",
    };
  }
}
