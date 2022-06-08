/* eslint-disable prettier/prettier */

import { IAddExpenseRepository, ICheckTravelByIdRepository } from "@/data/protocols"
import { Expense } from "@/domain/models";
import { mockExpenseModel } from "@/tests/domain/mocks";

export class AddExpenseRepositorySpy implements IAddExpenseRepository {
  expense = mockExpenseModel()
  async add(expenseData: Expense.Params): Promise<Expense.Model> {
    return this.expense
  }
}

export class CheckTravelByIdRepositorySpy implements ICheckTravelByIdRepository {
  travelExists = true;
  async check(id: string): Promise<boolean> {
    return this.travelExists;
  }
}

