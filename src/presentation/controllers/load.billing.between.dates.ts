import { ILoadBillingBetweenDates } from "@/domain/usecases";

import { MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class LoadBillingBetweenDatesController implements IController {
  constructor(
    private readonly loadBillingBetweenDates: ILoadBillingBetweenDates
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { startDate, endDate } = httpRequest.query;
      if (!startDate || !endDate) {
        return badRequest(new MissingParamError("startDate or endDate"));
      }
      const billing = await this.loadBillingBetweenDates.load(
        startDate,
        endDate
      );
      return ok(billing);
    } catch (error) {
      return serverError(error);
    }
  }
}
