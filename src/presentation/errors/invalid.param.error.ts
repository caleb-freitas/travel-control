export class InvalidParamError extends Error {
  constructor(parameterName: string) {
    super(`Invalid Param Error: ${parameterName}`);
    this.name = "InvalidParamError";
  }
}
