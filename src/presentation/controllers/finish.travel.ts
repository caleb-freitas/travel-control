import { IFinishTravel } from "@/domain/usecases";

import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class FinishTravelController implements IController {
  constructor(private readonly finishTravel: IFinishTravel) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return badRequest(new MissingParamError("id"));
      }
      const updatedTravel = await this.finishTravel.finish(id);
      if (!updatedTravel) {
        return badRequest(new InvalidParamError("id"));
      }
      return ok(updatedTravel);
    } catch (error) {
      return serverError(error);
    }
  }
}
