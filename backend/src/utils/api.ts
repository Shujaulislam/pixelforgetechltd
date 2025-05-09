import { Response } from 'express';

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message = 'Internal server error',
  statusCode = 500
) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
  };
  return res.status(statusCode).json(response);
};

// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }

  static BadRequest(message = 'Bad Request') {
    return new ApiError(message, 400);
  }

  static Unauthorized(message = 'Unauthorized') {
    return new ApiError(message, 401);
  }

  static Forbidden(message = 'Forbidden') {
    return new ApiError(message, 403);
  }

  static NotFound(message = 'Not Found') {
    return new ApiError(message, 404);
  }

  static Conflict(message = 'Conflict') {
    return new ApiError(message, 409);
  }

  static Internal(message = 'Internal Server Error') {
    return new ApiError(message, 500);
  }
}