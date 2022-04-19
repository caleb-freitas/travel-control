import {
  IAddExpenseRepository,
  ICheckTravelByIdRepository,
} from "@/data/protocols";
import { Expense, IAddExpense } from "@/domain/usecases";

export class DbAddExpense implements IAddExpense {
  constructor(
    private readonly checkTravelId: ICheckTravelByIdRepository,
    private readonly addExpense: IAddExpenseRepository
  ) {}

  async add(expenseData: Expense.Params): Promise<Expense.Model> {
    const travelExists = await this.checkTravelId.check(expenseData.travel_id);
    if (!travelExists) return null;
    const expense = await this.addExpense.add({
      ...expenseData,
    });
    return expense;
  }
}
