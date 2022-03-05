import { MissingParamError } from "../errors/missing.param.error";
import { badRequest } from "../helpers/http.helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class CompanySignUpController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }
    return {
      statusCode: 200,
      body: "",
    };
  }
}
