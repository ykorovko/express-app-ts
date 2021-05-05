import { NextFunction, Request, Response } from 'express'
import speakeasy from 'speakeasy'
import { getRepository } from 'typeorm'

import { User } from '../../typeorm/entities/User'
import { CustomError } from '../../utils/CustomError'

type RequestBody = {
  userId: string
  token: string
}

export const validate = async (req: Request<null, null, RequestBody>, res: Response, next: NextFunction) => {
  const { userId, token } = req.body

  const userRepository = getRepository(User)

  try {
    const user = await userRepository.findOne({ where: { id: userId } })

    const secret = user.secret

    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      window: 1,
      token
    })

    if (verified) {
      res.customSuccess(200, 'Success', { verified: true })
    } else {
      res.customSuccess(200, 'Success', { verified: false })
    }
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Token verification error')

    return next(customError)
  }
}
