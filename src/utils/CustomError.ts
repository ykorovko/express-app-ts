export type ErrorValidation = { [key: string]: string }

type ErrorType = 'General' | 'Raw' | 'Validation' | 'Unauthorized' | 'Not found'

type ErrorResponse = {
  status: number
  type: ErrorType
  message: string
  errors?: ErrorValidation
  raw?: any
  // If NODE_ENV='production' the stack trace is not included in the response
  stack?: string
}

export class CustomError extends Error {
  private httpStatusCode: number
  private errorType: ErrorType
  private errors: ErrorValidation | null
  private errorRaw: any

  constructor(
    httpStatusCode: number,
    errorType: ErrorType,
    message: string,
    errors: ErrorValidation | null = null,
    errorRaw: any = null
  ) {
    super(message)

    this.name = this.constructor.name

    this.httpStatusCode = httpStatusCode
    this.errorType = errorType
    this.errors = errors
    this.errorRaw = errorRaw
  }

  get HttpStatusCode() {
    return this.httpStatusCode
  }

  get JSON(): ErrorResponse {
    return {
      status: this.httpStatusCode,
      type: this.errorType,
      message: this.message,
      errors: this.errors,
      raw: this.errorRaw,
      stack: this.stack
    }
  }
}
