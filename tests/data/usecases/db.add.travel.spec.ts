import { dbAddTravelSut } from "@/tests/data/sut";
import {
  mockTravelModel,
  mockTravelParams,
  throwError,
} from "@/tests/domain/mocks";

describe("DbAddTravel", () => {
  test("should call AddTravelRepository with correct values", async () => {
    const { sut, addTravelSpy } = dbAddTravelSut();
    const addSpy = jest.spyOn(addTravelSpy, "add");
    await sut.add(mockTravelParams());
    expect(addSpy).toHaveBeenCalledWith(mockTravelParams());
  });

  test("should throw if AddTravelRepository throw", async () => {
    const { sut, addTravelSpy } = dbAddTravelSut();
    jest.spyOn(addTravelSpy, "add").mockImplementationOnce(throwError);
    const promise = sut.add(mockTravelParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call CheckCompanyByIdRepository with correct id", async () => {
    const { sut, checkCompanyByIdRepositorySpy } = dbAddTravelSut();
    const checkIdSpy = jest.spyOn(checkCompanyByIdRepositorySpy, "checkId");
    await sut.add(mockTravelParams());
    expect(checkIdSpy).toHaveBeenCalledWith(mockTravelParams().company_id);
  });

  test("should throw if CheckCompanyByIdRepository throw", async () => {
    const { sut, checkCompanyByIdRepositorySpy } = dbAddTravelSut();
    jest
      .spyOn(checkCompanyByIdRepositorySpy, "checkId")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockTravelParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call CheckDriverByIdRepository with correct id", async () => {
    const { sut, checkDriverByIdRepositorySpy } = dbAddTravelSut();
    const checkSpy = jest.spyOn(checkDriverByIdRepositorySpy, "check");
    await sut.add(mockTravelParams());
    expect(checkSpy).toHaveBeenCalledWith(mockTravelParams().driver_id);
  });

  test("should throw if CheckDriverByIdRepository throw", async () => {
    const { sut, checkDriverByIdRepositorySpy } = dbAddTravelSut();
    jest
      .spyOn(checkDriverByIdRepositorySpy, "check")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockTravelParams());
    await expect(promise).rejects.toThrow();
  });

  test("should call CheckTruckByIdRepository with correct id", async () => {
    const { sut, checkTruckByIdRepositorySpy } = dbAddTravelSut();
    const checkSpy = jest.spyOn(checkTruckByIdRepositorySpy, "check");
    await sut.add(mockTravelParams());
    expect(checkSpy).toHaveBeenCalledWith(mockTravelParams().truck_id);
  });

  test("should throw if CheckTruckByIdRepository throw", async () => {
    const { sut, checkTruckByIdRepositorySpy } = dbAddTravelSut();
    jest
      .spyOn(checkTruckByIdRepositorySpy, "check")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockTravelParams());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if AddTravelRepository return null", async () => {
    const { sut, addTravelSpy } = dbAddTravelSut();
    jest.spyOn(addTravelSpy, "add").mockImplementationOnce(null);
    const response = await sut.add(mockTravelParams());
    expect(response).toBeNull();
  });

  test("should return a travel on success", async () => {
    const { sut } = dbAddTravelSut();
    const response = await sut.add(mockTravelParams());
    expect(response).toEqual(mockTravelModel());
  });
});
