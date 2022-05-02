import { ICheckTravelByIdRepository } from "@/data/protocols/database";
import { Expense } from "@/domain/models";
import { ILoadExpensesByTravel } from "@/domain/usecases";

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
