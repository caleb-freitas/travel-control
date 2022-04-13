import { IAddTravel } from "@/domain/usecases";
import { AddTravelController } from "@/presentation/controllers";
import { IController, IValidation } from "@/presentation/protocols";
import { ValidationCompositeSpy } from "@/tests/infra/validators/mocks";
import { DbAddTravelSpy } from "@/tests/presentation/mocks";

type Sut = {
  sut: IController;
  addTravelSpy: IAddTravel;
  validationSpy: IValidation;
};

export function addTravelSut(): Sut {
  const addTravelSpy = new DbAddTravelSpy();
  const validationSpy = new ValidationCompositeSpy();
  const sut = new AddTravelController(validationSpy, addTravelSpy);
  return {
    sut,
    validationSpy,
    addTravelSpy,
  };
}
