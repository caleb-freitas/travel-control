import { IAddAccount } from "../../domain/usecases/add.account";
import { badRequest, ok, serverError } from "../helpers/http.helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IValidation } from "../protocols/validation";

export class CompanySignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { name, password, email, cnpj } = httpRequest.body;
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
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
