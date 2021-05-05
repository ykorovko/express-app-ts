import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { CustomError } from '../utils/CustomError'

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const validationErrors = errors.array().reduce((agg, err) => {
    return { ...agg, [err.param]: err.msg }
  }, {})

  const customError = new CustomError(422, 'Validation', 'Validation error', validationErrors)

  return res.status(422).json(customError.JSON)
}
