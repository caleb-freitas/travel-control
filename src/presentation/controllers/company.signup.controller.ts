import { InvalidParamError } from "../errors";
import { MissingParamError } from "../errors/missing.param.error";
import { badRequest, serverError } from "../helpers/http.helper";
import {
  ICnpjValidator,
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
  IPasswordValidator,
} from "../protocols";

export class CompanySignUpController implements IController {
  constructor(
    private readonly passwordValidator: IPasswordValidator,
    private readonly emailValidator: IEmailValidator,
    private readonly cnpjValidator: ICnpjValidator
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { password, passwordConfirmation, email, cnpj } = httpRequest.body;
      const requiredFields: string[] = [
        "name",
        "email",
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
      const validPassword = this.passwordValidator.isValid(password);
      if (!validPassword) {
        return badRequest(new InvalidParamError("password"));
      }
      const validEmail = this.emailValidator.isValid(email);
      if (!validEmail) {
        return badRequest(new InvalidParamError("email"));
      }
      const validCnpj = this.cnpjValidator.isCnpj(cnpj);
      if (!validCnpj) {
        return badRequest(new InvalidParamError("cnpj"));
      }
      return {
        statusCode: 200,
        body: "",
      };
    } catch (error) {
      return serverError(error);
    }
  }
}
