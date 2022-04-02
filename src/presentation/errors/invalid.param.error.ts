export class InvalidParamError extends Error {
  constructor(parameterName: string) {
    super(`Invalid param error: ${parameterName}`);
    this.name = "InvalidParamError";
  }
}
