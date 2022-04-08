import { RequiredFieldValidation } from "@/validation";

type Sut = {
  sut: RequiredFieldValidation;
};

export function requiredFieldsSut(): Sut {
  const sut = new RequiredFieldValidation("field");
  return {
    sut,
  };
}
