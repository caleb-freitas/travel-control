import { IAddDriver } from "../../../domain/usecases/add.driver";
import { FieldInUseError } from "../../errors";
import { badRequest, forbidden, serverError } from "../../helpers/http.helper";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IValidation } from "../../protocols/validation";

export class DriverSignUpController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addDriver: IAddDriver
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { company_id, name, email, password, driversLicense } =
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
        driversLicense,
      });
      if (!account) {
        return forbidden(new FieldInUseError());
      }
      return {
        statusCode: 200,
        body: {},
      };
    } catch (error) {
      return serverError(error);
    }
  }
}
