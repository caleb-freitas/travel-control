import { badRequest, serverError } from "../../helpers/http.helper";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IValidation } from "../../protocols/validation";

export class DriverSignUpController implements IController {
  constructor(private readonly validation: IValidation) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
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
