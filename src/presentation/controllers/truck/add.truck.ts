import { IAddTruck } from "@/domain/usecases";
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

export class AddTruckController implements IController {
  constructor(
    private readonly addTruck: IAddTruck,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const invalid = this.validation.validate(httpRequest.body);
      if (invalid) {
        return badRequest(invalid);
      }
      const truck = await this.addTruck.add({
        ...httpRequest.body,
      });
      if (truck instanceof FieldInUseError) {
        return forbidden(truck);
      }
      if (truck instanceof InvalidParamError) {
        return notFound(truck);
      }
      return ok(truck);
    } catch (error) {
      return serverError(error);
    }
  }
}
