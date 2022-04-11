import { IAddDriver } from "@/domain/usecases";
import { DriverSignUpController } from "@/presentation/controllers";
import { IController, IValidation } from "@/presentation/protocols";
import { ValidationCompositeSpy } from "@/tests/infra/validators/mocks";
import { DbAddDriverSpy } from "@/tests/presentation/mocks";

type Sut = {
  sut: IController;
  validationSpy: IValidation;
  addDriverSpy: IAddDriver;
};

export function driverSignupSut(): Sut {
  const validationSpy = new ValidationCompositeSpy();
  const addDriverSpy = new DbAddDriverSpy();
  const sut = new DriverSignUpController(addDriverSpy, validationSpy);
  return {
    sut,
    validationSpy,
    addDriverSpy,
  };
}
