import { Expense } from "@/domain/usecases";

export interface ILoadExpensesByTravel {
  load(travel_id: string): Promise<Expense.Model[]>;
}
