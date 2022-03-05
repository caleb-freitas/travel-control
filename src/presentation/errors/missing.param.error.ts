export class MissingParamError extends Error {
  constructor(parameterName: string) {
    super(`Missing Param Error: ${parameterName}`);
    this.name = "MissingParamError";
  }
}
