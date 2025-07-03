export const ErrorCode = {
  EMAIL_ALREADY_IN_USE: "EMAIL_ALREADY_IN_USE",
  VALIDATION: "VALIDATION",

  // HTTP Errors
  BAD_REQUEST: "BAD_REQUEST",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = keyof typeof ErrorCode;
