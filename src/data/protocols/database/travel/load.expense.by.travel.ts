import { Expense } from "@/domain/usecases";

export interface ILoadExpensesByTravelRepository {
  load(travel_id: string): Promise<Expense.Model[]>;
}
