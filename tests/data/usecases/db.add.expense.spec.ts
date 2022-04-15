import { dbAddExpenseSut } from "@/tests/data/sut";
import {
  mockExpenseModel,
  mockExpenseParams,
  throwError,
} from "@/tests/domain/mocks";

describe("BdAddExpense", () => {
  test("should return an expense on success", async () => {
    const { sut } = dbAddExpenseSut();
    const response = await sut.add(mockExpenseParams());
    expect(response).toEqual(mockExpenseModel());
  });

  test("should call CheckTravelByIdRepository with correct travel id", async () => {
    const { sut, checkExpenseByIdRepositorySpy } = dbAddExpenseSut();
    const checkSpy = jest.spyOn(checkExpenseByIdRepositorySpy, "check");
    await sut.add(mockExpenseParams());
    expect(checkSpy).toHaveBeenCalledWith(mockExpenseParams().travel_id);
  });

  test("should throw if CheckTravelByIdRepository throw", async () => {
    const { sut, checkExpenseByIdRepositorySpy } = dbAddExpenseSut();
    jest
      .spyOn(checkExpenseByIdRepositorySpy, "check")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockExpenseParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call DbAddExpense with correct values", async () => {
    const { sut, addExpenseSpy } = dbAddExpenseSut();
    const addSpy = jest.spyOn(addExpenseSpy, "add");
    await sut.add(mockExpenseParams());
    expect(addSpy).toHaveBeenCalledWith(mockExpenseParams());
  });

  test("should throw if DbAddExpense throw", async () => {
    const { sut, addExpenseSpy } = dbAddExpenseSut();
    jest.spyOn(addExpenseSpy, "add").mockImplementationOnce(throwError);
    const promise = sut.add(mockExpenseParams());
    await expect(promise).rejects.toThrow();
  });
});
