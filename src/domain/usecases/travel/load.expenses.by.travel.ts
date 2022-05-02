import { Expense } from "@/domain/models";

export interface ILoadExpensesByTravel {
  load(travel_id: string): Promise<Expense.Model[]>;
}
