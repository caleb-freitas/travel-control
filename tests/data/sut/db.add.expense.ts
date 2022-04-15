import {
  IAddExpenseRepository,
  ICheckTravelByIdRepository,
} from "@/data/protocols";
import { DbAddExpense } from "@/data/usecases";
import { IAddExpense } from "@/domain/usecases";
import {
  AddExpenseRepositorySpy,
  CheckTravelByIdRepositorySpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: IAddExpense;
  addExpenseSpy: IAddExpenseRepository;
  checkExpenseByIdRepositorySpy: ICheckTravelByIdRepository;
};

export function dbAddExpenseSut(): Sut {
  const addExpenseSpy = new AddExpenseRepositorySpy();
  const checkExpenseByIdRepositorySpy = new CheckTravelByIdRepositorySpy();
  const sut = new DbAddExpense(checkExpenseByIdRepositorySpy, addExpenseSpy);
  return {
    sut,
    addExpenseSpy,
    checkExpenseByIdRepositorySpy,
  };
}
