import { Request, Response, NextFunction } from 'express'

import { CustomError } from '../utils/CustomError'

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.HttpStatusCode).json(err.JSON)
}
