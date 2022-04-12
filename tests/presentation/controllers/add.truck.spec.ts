import { serverError } from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import { addTruckSut } from "@/tests/presentation/controllers/sut";
import { mockTruckRequest } from "@/tests/presentation/mocks";

describe("AddTruckController", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationSpy } = addTruckSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockTruckRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockTruckRequest().body);
  });

  test("should throw if Validation throw", async () => {
    const { sut, validationSpy } = addTruckSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(serverError(response));
  });

  test("should call DbAddTruck with correct values", async () => {
    const { sut, addTruckSpy } = addTruckSut();
    const addSpy = jest.spyOn(addTruckSpy, "add");
    await sut.handle(mockTruckRequest());
    expect(addSpy).toHaveBeenCalledWith(mockTruckRequest().body);
  });

  test("should throw if DbAddTruck throw", async () => {
    const { sut, addTruckSpy } = addTruckSut();
    jest.spyOn(addTruckSpy, "add").mockImplementationOnce(throwError);
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(serverError(response));
  });
});
