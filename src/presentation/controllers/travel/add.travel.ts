import { IAddTravel } from "@/domain/usecases";
import { InvalidParamError } from "@/presentation/errors";
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from "@/presentation/protocols";

export class AddTravelController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addTravel: IAddTravel
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { driver_id, truck_id } = httpRequest.params;
      const invalid = this.validation.validate({
        ...httpRequest.body,
        driver_id,
        truck_id,
      });
      if (invalid) {
        return badRequest(invalid);
      }
      const travel = await this.addTravel.add({
        ...httpRequest.body,
        driver_id,
        truck_id,
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
