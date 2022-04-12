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
});
