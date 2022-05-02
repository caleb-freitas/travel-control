import { IAddCompany } from "@/domain/usecases";
import { FieldInUseError } from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from "@/presentation/protocols";

export class CompanySignUpController implements IController {
  constructor(
    private readonly addCompany: IAddCompany,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { name, password, email, cnpj } = httpRequest.body;
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const account = await this.addCompany.add({
        name,
        email,
        password,
        cnpj,
      });
      if (account instanceof FieldInUseError) {
        return forbidden(account);
      }
      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
