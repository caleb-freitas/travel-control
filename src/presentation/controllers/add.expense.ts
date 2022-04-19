import { IAddExpense } from "@/domain/usecases";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from "@/presentation/protocols";

import { InvalidParamError } from "../errors";

export class AddExpenseController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addExpense: IAddExpense
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { travel_id } = httpRequest.params;
      const invalid = this.validation.validate({
        ...httpRequest.body,
        travel_id,
      });
      if (invalid) {
        return badRequest(invalid);
      }
      const expense = await this.addExpense.add({
        ...httpRequest.body,
        travel_id,
      });
      console.log(expense);
      if (!expense) {
        return badRequest(new InvalidParamError("travel_id"));
      }
      return ok(expense);
    } catch (error) {
      return serverError(error);
    }
  }
}
