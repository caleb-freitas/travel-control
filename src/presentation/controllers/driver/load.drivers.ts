import { ILoadDrivers } from "@/domain/usecases";
import { ok, serverError } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/protocols";

export class LoadDriversController implements IController {
  constructor(private readonly dbLoadDrivers: ILoadDrivers) { }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const drivers = await this.dbLoadDrivers.load();
      return ok(drivers)
    } catch (error) {
      return serverError(error)
    }
  }
}
