import { IAddExpenseRepository } from "@/data/protocols";
import { Expense } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class AddExpenseRepository implements IAddExpenseRepository {
  async add(expenseData: Expense.Params): Promise<Expense.Model> {
    const expense = await prisma.expense.create({
      data: {
        ...expenseData,
      },
    });
    return expense;
  }
}
