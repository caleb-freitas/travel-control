import { dbAddTruckSut } from "@/tests/data/sut";
import { mockTruckParams, throwError } from "@/tests/domain/mocks";

describe("DbAddTruck", () => {
  test("should call CheckTruckByLicensePlateRepository with correct email", async () => {
    const { sut, checkTruckLicensePlateRepositorySpy } = dbAddTruckSut();
    const checkSpy = jest.spyOn(checkTruckLicensePlateRepositorySpy, "check");
    await sut.add(mockTruckParams());
    expect(checkSpy).toHaveBeenCalledWith(mockTruckParams().license_plate);
  });

  test("should throw if CheckTruckByLicensePlateRepository throw", async () => {
    const { sut, checkTruckLicensePlateRepositorySpy } = dbAddTruckSut();
    jest
      .spyOn(checkTruckLicensePlateRepositorySpy, "check")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockTruckParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call AddTruckRepository with correct values", async () => {
    const { sut, addTruckRepositorySpy } = dbAddTruckSut();
    const addSpy = jest.spyOn(addTruckRepositorySpy, "add");
    await sut.add(mockTruckParams());
    expect(addSpy).toHaveBeenCalledWith(mockTruckParams());
  });

  test("should throw if AddTruckRepository throw", async () => {
    const { sut, addTruckRepositorySpy } = dbAddTruckSut();
    jest.spyOn(addTruckRepositorySpy, "add").mockImplementationOnce(throwError);
    const promise = sut.add(mockTruckParams());
    await expect(promise).rejects.toThrow();
  });
});
