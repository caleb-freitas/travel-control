import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers";
import { mockTravelModel, throwError } from "@/tests/domain/mocks";
import { addTravelSut } from "@/tests/presentation/controllers/sut";
import { mockTravelRequest } from "@/tests/presentation/mocks";

describe("AddTravelController", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationSpy } = addTravelSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockTravelRequest());
    expect(validateSpy).toHaveBeenCalledWith({
      ...mockTravelRequest().body,
      ...mockTravelRequest().params,
    });
  });

  test("should return 500 if Validation throw", async () => {
    const { sut, validationSpy } = addTravelSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
    const response = await sut.handle(mockTravelRequest());
    expect(response).toEqual(serverError(response));
  });

  test("should return 400 if Validation return an error", async () => {
    const { sut, validationSpy } = addTravelSut();
    jest
      .spyOn(validationSpy, "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const response = await sut.handle(mockTravelRequest());
    expect(response).toEqual(badRequest(new MissingParamError("field")));
  });

  test("should call DbAddTravel with correct values", async () => {
    const { sut, addTravelSpy } = addTravelSut();
    const addSpy = jest.spyOn(addTravelSpy, "add");
    await sut.handle(mockTravelRequest());
    expect(addSpy).toHaveBeenCalledWith({
      ...mockTravelRequest().body,
      ...mockTravelRequest().params,
    });
  });

  test("should return 500 if DbAddTravel throw", async () => {
    const { sut, addTravelSpy } = addTravelSut();
    jest.spyOn(addTravelSpy, "add").mockImplementationOnce(throwError);
    const response = await sut.handle(mockTravelRequest());
    expect(response).toEqual(serverError(response));
  });

  test("should return 404 if DbAddDriver return an InvalidParamError", async () => {
    const { sut, addTravelSpy } = addTravelSut();
    jest
      .spyOn(addTravelSpy, "add")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(new InvalidParamError("field")))
      );
    const response = await sut.handle(mockTravelRequest());
    expect(response).toEqual(notFound(new InvalidParamError("field")));
  });

  test("should return 200 on success", async () => {
    const { sut } = addTravelSut();
    const response = await sut.handle(mockTravelRequest());
    expect(response).toEqual(ok(mockTravelModel()));
  });
});
