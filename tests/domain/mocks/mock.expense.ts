import { Expense } from "@/domain/models";

export const mockExpenseParams = (): Expense.Params => ({
  travel_id: "travel_id",
  label: "expense_label",
  description: "expense_description",
  value: 100,
  payment_method: "debit",
});

export const mockExpenseModel = (): Expense.Model => ({
  id: "expense_id",
  travel_id: "travel_id",
  label: "expense_label",
  description: "expense_description",
  value: 100,
  payment_method: "debit",
  created_at: new Date("1995-12-17T03:24:00"),
});
