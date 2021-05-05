import { NextFunction, Request, Response } from 'express'
import speakeasy from 'speakeasy'
import { getRepository } from 'typeorm'

import { User } from '../../typeorm/entities/User'
import { CustomError } from '../../utils/CustomError'

type RequestBody = {
  userId: string
  token: string
}

export const verify = async (req: Request<null, null, RequestBody>, res: Response, next: NextFunction) => {
  const { token } = req.body

  const { email } = req.jwtPayload

  const userRepository = getRepository(User)

  try {
    const user = await userRepository.findOne({ where: { email } })

    const secret = user.temp_secret

    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token
    })

    user.temp_secret = null
    user.secret = secret

    await userRepository.save(user)

    if (verified) {
      res.customSuccess(200, 'Success', { verified: true })
    } else {
      res.customSuccess(200, 'Success', { verified: false })
    }
  } catch (err) {
    console.log(err)

    const customError = new CustomError(400, 'General', 'Token verification error')

    return next(customError)
  }
}
