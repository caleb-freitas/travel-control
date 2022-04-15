import { dbAddExpenseSut } from "@/tests/data/sut";
import { mockExpenseModel, mockExpenseParams } from "@/tests/domain/mocks";

describe("BdAddExpense", () => {
  test("should return an expense on success", async () => {
    const { sut } = dbAddExpenseSut();
    const response = await sut.add(mockExpenseParams());
    expect(response).toEqual(mockExpenseModel());
  });
});
