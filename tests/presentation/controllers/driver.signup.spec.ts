import {
  FieldInUseError,
  InvalidParamError,
  MissingParamError,
  ServerError,
} from "@/presentation/errors";
import {
  badRequest,
  forbidden,
  notFound,
  ok,
  serverError,
} from "@/presentation/helpers";
import { mockDriverResult } from "@/tests/domain/mocks";
import { driverSignupSut } from "@/tests/presentation/controllers/sut";
import { mockDriverRequest } from "@/tests/presentation/mocks";

describe("DriverSignUpController", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationSpy } = driverSignupSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockDriverRequest());
    expect(validateSpy).toHaveBeenCalledWith({
      company_id: "company_id",
      name: "driver",
      email: "driver@email.com",
      password: "valid_password",
      passwordConfirmation: "valid_password",
      drivers_license: "drivers_license",
    });
  });

  test("should return 500 if Validation throw", async () => {
    const { sut, validationSpy } = driverSignupSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(mockDriverRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return 400 if Validation return an error", async () => {
    const { sut, validationSpy } = driverSignupSut();
    jest
      .spyOn(validationSpy, "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const response = await sut.handle(mockDriverRequest());
    expect(response).toEqual(badRequest(new MissingParamError("field")));
  });

  test("should call AddDriver with correct values", async () => {
    const { sut, addDriverSpy } = driverSignupSut();
    const addSpy = jest.spyOn(addDriverSpy, "add");
    await sut.handle(mockDriverRequest());
    expect(addSpy).toHaveBeenCalledWith({
      company_id: "company_id",
      name: "driver",
      email: "driver@email.com",
      password: "valid_password",
      drivers_license: "drivers_license",
    });
  });

  test("should return 500 if AddDriver throw", async () => {
    const { sut, addDriverSpy } = driverSignupSut();
    jest.spyOn(addDriverSpy, "add").mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(mockDriverRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });

  test("should return an account on success", async () => {
    const { sut } = driverSignupSut();
    const response = await sut.handle(mockDriverRequest());
    expect(response).toEqual(ok(mockDriverResult()));
  });

  test("should return 403 if DbAddDriver return a FieldInUseError", async () => {
    const { sut, addDriverSpy } = driverSignupSut();
    jest
      .spyOn(addDriverSpy, "add")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(new FieldInUseError("field")))
      );
    const response = await sut.handle(mockDriverRequest());
    expect(response).toEqual(forbidden(new FieldInUseError("field")));
  });

  test("should return 404 if DbAddDriver return an InvalidParamError", async () => {
    const { sut, addDriverSpy } = driverSignupSut();
    jest
      .spyOn(addDriverSpy, "add")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(new InvalidParamError("field")))
      );
    const response = await sut.handle(mockDriverRequest());
    expect(response).toEqual(notFound(new InvalidParamError("field")));
  });
});
