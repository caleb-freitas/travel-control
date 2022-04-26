import { Expense } from "@/domain/usecases";
import { ILoadExpensesByTravel } from "@/domain/usecases/load.expenses.by.travel";

import { ICheckTravelByIdRepository } from "../protocols";

export class DbLoadExpensesByTravel implements ILoadExpensesByTravel {
  constructor(
    private readonly checkTravelByIdRepository: ICheckTravelByIdRepository,
    private readonly loadExpensesByTravelRepository: ILoadExpensesByTravel
  ) {}
  async load(travel_id: string): Promise<Expense.Model[]> {
    const travel = await this.checkTravelByIdRepository.check(travel_id);
    if (!travel) return null;
    const expenses = await this.loadExpensesByTravelRepository.load(travel_id);
    return expenses;
  }
}
