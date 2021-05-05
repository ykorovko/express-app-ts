import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'

export const validatorLogin = [
  check('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
  check('password').notEmpty().withMessage('Password is required')
]
