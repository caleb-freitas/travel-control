import { ILoadExpensesByTravel } from "@/domain/usecases";
import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@/presentation/protocols";

export class LoadExpensesByTravelController implements IController {
  constructor(private readonly loadExpenses: ILoadExpensesByTravel) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { travel_id } = httpRequest.params;
      if (!travel_id) {
        return badRequest(new MissingParamError("travel_id"));
      }
      const expenses = await this.loadExpenses.load(travel_id);
      if (!expenses) {
        return badRequest(new InvalidParamError("travel_id"));
      }
      return ok(expenses);
    } catch (error) {
      return serverError(error);
    }
  }
}
