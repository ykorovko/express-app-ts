import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../../typeorm/entities/User'
import { JwtPayload } from '../../types/jwt'
import { createJwtToken } from '../../utils/createJwtToken'
import { CustomError } from '../../utils/CustomError'

type RequestBody = {
  fullname: string
  phone: string
  email: string
  password: string
}

export const login = async (req: Request<null, null, RequestBody>, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  const userRepository = getRepository(User)

  try {
    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      const customError = new CustomError(404, 'Not found', 'Incorrect email or password')

      return next(customError)
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(404, 'Not found', 'Incorrect email or password')

      return next(customError)
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      fullname: user.fullname,
      phone: user.phone,
      email: user.email,
      created_at: user.created_at
    }

    try {
      const token = createJwtToken(jwtPayload)

      res.customSuccess(200, 'Token successfully created.', {
        token,
        user
      })
    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err)

      return next(customError)
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err)

    return next(customError)
  }
}
