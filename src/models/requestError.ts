export class RequestError extends Error {
  public readonly status: number;

  constructor(code: number, description?: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.status = code;

    Error.captureStackTrace(this);
  }
}