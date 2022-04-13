import { IAddTravel } from "@/domain/usecases";
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from "@/presentation/protocols";

import { InvalidParamError } from "../errors";

export class AddTravelController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addTravel: IAddTravel
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const invalid = this.validation.validate(httpRequest.body);
      if (invalid) {
        return badRequest(invalid);
      }
      const travel = await this.addTravel.add({
        ...httpRequest.body,
      });
      if (travel instanceof InvalidParamError) {
        return notFound(travel);
      }
      return ok(travel);
    } catch (error) {
      return serverError(error);
    }
  }
}
