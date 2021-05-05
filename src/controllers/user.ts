import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../typeorm/entities/User'
import { CustomError } from '../utils/CustomError'

type RequestBody = {
  fullname: string
  phone: string
  email: string
  password: string
}

export const me = async (req: Request<null, null, RequestBody>, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User)

  const { email } = req.jwtPayload

  try {
    const user = await userRepository.findOne({ where: { email } })

    res.customSuccess(200, 'Success', user)
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err)

    return next(customError)
  }
}
