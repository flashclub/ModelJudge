export class OpenAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = "OpenAIError";
    this.type = type;
    this.param = param;
    this.code = code;

    // This is necessary for proper stack trace in TypeScript
    Object.setPrototypeOf(this, OpenAIError.prototype);
  }

  getFullMessage(): string {
    return `OpenAI API Error:
      Message: ${this.message}
      Type: ${this.type}
      Param: ${this.param}
      Code: ${this.code}`;
  }
}

// You can also define specific error types if needed
export class OpenAIAuthenticationError extends OpenAIError {
  constructor(message: string) {
    super(message, "authentication_error", "", "401");
    this.name = "OpenAIAuthenticationError";
  }
}

export class OpenAIRateLimitError extends OpenAIError {
  constructor(message: string) {
    super(message, "rate_limit_error", "", "429");
    this.name = "OpenAIRateLimitError";
  }
}

export class OpenAIInvalidRequestError extends OpenAIError {
  constructor(message: string, param: string) {
    super(message, "invalid_request_error", param, "400");
    this.name = "OpenAIInvalidRequestError";
  }
}

// Helper function to create the appropriate error based on the API response
export function createOpenAIError(error: any): OpenAIError {
  if (error.type === "authentication_error") {
    return new OpenAIAuthenticationError(error.message);
  } else if (error.type === "rate_limit_error") {
    return new OpenAIRateLimitError(error.message);
  } else if (error.type === "invalid_request_error") {
    return new OpenAIInvalidRequestError(error.message, error.param);
  } else {
    return new OpenAIError(error.message, error.type, error.param, error.code);
  }
}
