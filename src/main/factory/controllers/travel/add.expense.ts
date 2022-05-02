import { makeDbAddExpense } from "@/main/factory/usecases";
import { makeAddExpenseValidation } from "@/main/factory/validations";
import { AddExpenseController } from "@/presentation/controllers";
import { IController } from "@/presentation/protocols";

export function makeAddExpenseController(): IController {
  return new AddExpenseController(
    makeAddExpenseValidation(),
    makeDbAddExpense()
  );
}
