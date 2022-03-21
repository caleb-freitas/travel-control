export class FieldInUseError extends Error {
  constructor(parameterName: string) {
    super(`Field already in use: ${parameterName}`);
    this.name = "FieldInUseError";
  }
}
