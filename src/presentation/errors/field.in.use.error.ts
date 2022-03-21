export class FieldInUseError extends Error {
  constructor() {
    super(`Field already in use: email or cnpj`);
    this.name = "FieldInUseError";
  }
}
