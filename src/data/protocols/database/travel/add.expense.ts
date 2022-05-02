import { Expense } from "@/domain/usecases";

export interface IAddExpenseRepository {
  add(expenseData: Expense.Params): Promise<Expense.Model>;
}
