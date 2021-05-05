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

export const register = async (req: Request<null, null, RequestBody>, res: Response, next: NextFunction) => {
  const { fullname, phone, email, password } = req.body

  const userRepository = getRepository(User)

  try {
    const user = await userRepository.findOne({ where: { email } })

    if (user) {
      const customError = new CustomError(400, 'General', 'User already exists')

      return next(customError)
    }

    try {
      const newUser = new User()

      newUser.fullname = fullname
      newUser.phone = phone
      newUser.email = email
      newUser.password = password

      newUser.hashPassword()

      const jwtPayload: JwtPayload = {
        id: newUser.id,
        fullname: newUser.fullname,
        phone: newUser.phone,
        email: newUser.email,
        created_at: newUser.created_at
      }

      const token = createJwtToken(jwtPayload)

      await userRepository.save(newUser)

      res.customSuccess(200, 'User successfully created.', { token, user: newUser })
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `User '${email}' can't be created`, null, err)

      return next(customError)
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err)

    return next(customError)
  }
}
