import { dbAddTruckSut } from "@/tests/data/sut";
import {
  mockTruckModel,
  mockTruckParams,
  throwError,
} from "@/tests/domain/mocks";

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

  test("should return null if CheckTruckByLicensePlateRepository return null", async () => {
    const { sut, checkTruckLicensePlateRepositorySpy } = dbAddTruckSut();
    jest
      .spyOn(checkTruckLicensePlateRepositorySpy, "check")
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const response = await sut.add(mockTruckParams());
    expect(response).toBeNull();
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

  test("should return a truck on success", async () => {
    const { sut } = dbAddTruckSut();
    const response = await sut.add(mockTruckParams());
    expect(response).toEqual(mockTruckModel());
  });
});
