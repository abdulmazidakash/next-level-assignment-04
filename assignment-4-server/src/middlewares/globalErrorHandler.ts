import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let errMessage = "Internal server Error!";
  let errorDetails = err;

  // Prisma validation error (wrong input / missing fields)
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errMessage = "Incorrect body or missing fields";
  }
  // Prisma known request errors (like unique constraint violation)
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    if (err.code === "P2002") {
      errMessage = `Duplicate value for field: ${err.meta?.target}`;
    } else {
      errMessage = err.message;
    }
  }
  // Generic JavaScript errors (TypeError, ReferenceError, etc.)
  else if (err instanceof Error) {
    errMessage = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: errMessage,
    error: process.env.NODE_ENV === "production" ? undefined : errorDetails,
  });
}