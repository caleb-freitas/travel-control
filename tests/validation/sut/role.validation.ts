import { RoleValidation } from "@/validation";

type Sut = {
  sut: RoleValidation;
};

export function roleValidationSut(): Sut {
  const roleOptions = ["company", "driver"];
  const sut = new RoleValidation("role", roleOptions);
  return {
    sut,
  };
}
