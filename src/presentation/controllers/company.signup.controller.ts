import { InvalidParamError } from "../errors";
import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http.helper";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IPasswordValidator,
} from "../protocols";

export class CompanySignUpController implements IController {
  constructor(private readonly passwordValidator: IPasswordValidator) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { password, passwordConfirmation } = httpRequest.body;
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
    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError("passwordConfirmation"));
    }
    this.passwordValidator.isValid(password);
    return {
      statusCode: 200,
      body: "",
    };
  }
}
