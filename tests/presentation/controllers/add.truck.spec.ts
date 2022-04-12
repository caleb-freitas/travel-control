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
});
