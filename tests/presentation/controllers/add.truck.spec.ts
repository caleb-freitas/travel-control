import {
  FieldInUseError,
  InvalidParamError,
  MissingParamError,
} from "@/presentation/errors";
import {
  badRequest,
  forbidden,
  notFound,
  ok,
  serverError,
} from "@/presentation/helpers";
import { mockTruckModel, throwError } from "@/tests/domain/mocks";
import { addTruckSut } from "@/tests/presentation/controllers/sut";
import { mockTruckRequest } from "@/tests/presentation/mocks";

describe("AddTruckController", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationSpy } = addTruckSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockTruckRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockTruckRequest().body);
  });

  test("should return 500 if Validation throw", async () => {
    const { sut, validationSpy } = addTruckSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(serverError(response));
  });

  test("should return 400 if Validation return an error", async () => {
    const { sut, validationSpy } = addTruckSut();
    jest
      .spyOn(validationSpy, "validate")
      .mockReturnValueOnce(new MissingParamError("license_plate"));
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(
      badRequest(new MissingParamError("license_plate"))
    );
  });

  test("should call DbAddTruck with correct values", async () => {
    const { sut, addTruckSpy } = addTruckSut();
    const addSpy = jest.spyOn(addTruckSpy, "add");
    await sut.handle(mockTruckRequest());
    expect(addSpy).toHaveBeenCalledWith(mockTruckRequest().body);
  });

  test("should return 500 if DbAddTruck throw", async () => {
    const { sut, addTruckSpy } = addTruckSut();
    jest.spyOn(addTruckSpy, "add").mockImplementationOnce(throwError);
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(serverError(response));
  });

  test("should return 403 if DbAddDriver return a FieldInUseError", async () => {
    const { sut, addTruckSpy } = addTruckSut();
    jest
      .spyOn(addTruckSpy, "add")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(new FieldInUseError("field")))
      );
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(forbidden(new FieldInUseError("field")));
  });

  test("should return 404 if DbAddDriver return an InvalidParamError", async () => {
    const { sut, addTruckSpy } = addTruckSut();
    jest
      .spyOn(addTruckSpy, "add")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(new InvalidParamError("field")))
      );
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(notFound(new InvalidParamError("field")));
  });

  test("should return 200 on success", async () => {
    const { sut } = addTruckSut();
    const response = await sut.handle(mockTruckRequest());
    expect(response).toEqual(ok(mockTruckModel()));
  });
});
