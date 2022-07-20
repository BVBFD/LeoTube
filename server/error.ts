export const createError = (status: number, message: string) => {
  const error: ErrorType = { status: undefined, message: undefined };
  error.status = status;
  error.message = message;
  return error;
};
