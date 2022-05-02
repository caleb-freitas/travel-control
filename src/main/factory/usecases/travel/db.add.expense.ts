import { DbAddExpense } from "@/data/usecases";
import { IAddExpense } from "@/domain/usecases";
import {
  CheckTravelByIdRepository,
  AddExpenseRepository,
} from "@/infra/repositories";

export function makeDbAddExpense(): IAddExpense {
  const checkTravelByIdRepository = new CheckTravelByIdRepository();
  const addExpenseRepository = new AddExpenseRepository();
  return new DbAddExpense(checkTravelByIdRepository, addExpenseRepository);
}
