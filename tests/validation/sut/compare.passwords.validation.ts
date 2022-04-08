import { CompareFieldsValidation } from "@/validation";

type Sut = {
  sut: CompareFieldsValidation;
};

export function comparePasswordsSut(): Sut {
  const sut = new CompareFieldsValidation("field", "fieldToCompare");
  return { sut };
}
