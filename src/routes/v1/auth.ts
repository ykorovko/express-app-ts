import { Router } from 'express'

import { login, register } from '../../controllers/auth'
import { validatorLogin, validatorRegister } from '../../middlewares/validation/auth'
import { validate } from '../../middlewares/validator'

const router = Router()

router.post('/login', validatorLogin, validate, login)

router.post('/register', validatorRegister, validate, register)

export default router
