import { IAddTruck } from "@/domain/usecases";
import { AddTruckController } from "@/presentation/controllers";
import { IController, IValidation } from "@/presentation/protocols";
import { ValidationCompositeSpy } from "@/tests/infra/validators/mocks";
import { DbAddTruckSpy } from "@/tests/presentation/mocks";

type Sut = {
  sut: IController;
  addTruckSpy: IAddTruck;
  validationSpy: IValidation;
};

export function addTruckSut(): Sut {
  const addTruckSpy = new DbAddTruckSpy();
  const validationSpy = new ValidationCompositeSpy();
  const sut = new AddTruckController(addTruckSpy, validationSpy);
  return {
    sut,
    validationSpy,
    addTruckSpy,
  };
}
