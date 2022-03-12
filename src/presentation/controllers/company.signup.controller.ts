import { IAddAccount } from "../../domain/usecases/add.account";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http.helper";
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
    private readonly cnpjValidator: ICnpjValidator,
    private readonly addAccount: IAddAccount
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { name, password, passwordConfirmation, email, cnpj } =
        httpRequest.body;
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
      const account = await this.addAccount.add({
        name,
        email,
        password,
        cnpj,
      });
      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
