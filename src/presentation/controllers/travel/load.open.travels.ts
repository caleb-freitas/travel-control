import { ILoadOpenTravels } from "@/domain/usecases";
import { MissingParamError } from "@/presentation/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/presentation/protocols";

export class LoadOpenTravelsController implements IController {
  constructor(private readonly loadOpenTravels: ILoadOpenTravels) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { company_id } = httpRequest.body;
      if (!company_id) {
        return badRequest(new MissingParamError("company_id"));
      }
      const travels = await this.loadOpenTravels.load(company_id);
      return ok(travels);
    } catch (error) {
      return serverError(error);
    }
  }
}
