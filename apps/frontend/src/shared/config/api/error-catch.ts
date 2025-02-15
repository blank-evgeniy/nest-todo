interface ErrorResponse extends Error {
  response?: {
    data?: {
      message: string | string[];
    };
  };
}

export const errorCatch = (error: unknown): string => {
  const err = error as ErrorResponse;
  const message = err.response?.data?.message;

  return message ? (Array.isArray(message) ? message[0] : message) : err.message;
};
