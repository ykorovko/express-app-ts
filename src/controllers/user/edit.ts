import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../../typeorm/entities/User'
import { CustomError } from '../../utils/CustomError'

type RequestBody = {
  fullname: string
  phone: string
  email: string
  password: string
  oath: boolean
}

export const edit = async (req: Request<null, null, RequestBody>, res: Response, next: NextFunction) => {
  const payload = req.body

  const userRepository = getRepository(User)

  const { email } = req.jwtPayload

  try {
    const user = await userRepository.findOne({ where: { email } })

    const updatedUser = await userRepository.save({ ...user, ...payload })

    res.customSuccess(200, 'User updated', updatedUser)
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err)

    return next(customError)
  }
}
