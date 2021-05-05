import { Request, Response, NextFunction } from 'express'
import { check, body, oneOf } from 'express-validator'

export const validatorRegister = [
  check('fullname').notEmpty().withMessage('Fullname is required'),
  check('phone').notEmpty().withMessage('Phone is required'),
  check('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
  check('password').notEmpty().withMessage('Password is required'),
  check('passwordConfirm').notEmpty().withMessage('Confirm password is required')
]
