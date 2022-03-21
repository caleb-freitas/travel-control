import { IAddDriver } from "../../../domain/usecases/add.driver";
import { FieldInUseError } from "../../errors";
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from "../../helpers/http.helper";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IValidation } from "../../protocols/validation";

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
      if (account) {
        return ok(account);
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
