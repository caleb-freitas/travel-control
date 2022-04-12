import { IAddDriver } from "@/domain/usecases";
import { FieldInUseError, InvalidParamError } from "@/presentation/errors";
import {
  badRequest,
  forbidden,
  notFound,
  ok,
  serverError,
} from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from "@/presentation/protocols";

export class DriverSignUpController implements IController {
  constructor(
    private readonly addDriver: IAddDriver,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { company_id, name, email, password, drivers_license } =
        httpRequest.body;
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const account = await this.addDriver.add({
        company_id,
        name,
        email,
        password,
        drivers_license,
      });
      if (account instanceof FieldInUseError) {
        return forbidden(account);
      }
      if (account instanceof InvalidParamError) {
        return notFound(account);
      }
      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
