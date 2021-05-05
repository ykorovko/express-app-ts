import { Language } from 'typeorm/entities/users/types'

import { JwtPayload } from '../jwt'

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload
    }

    export interface Response {
      customSuccess(httpStatusCode: number, message: string, data?: any): Response
    }
  }
}
