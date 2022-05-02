import { Expense } from "@/domain/models";

export interface IAddExpense {
  add(expenseData: Expense.Params): Promise<Expense.Model>;
}
