import { Router } from 'express'

import { login, register, validate, verify } from '../../controllers/auth'
import { checkJwt } from '../../middlewares/checkJwt'
import { validatorLogin, validatorRegister } from '../../middlewares/validation/auth'
import { expressValidator } from '../../middlewares/validator'

const router = Router()

router.post('/login', validatorLogin, expressValidator, login)

router.post('/register', validatorRegister, expressValidator, register)

router.post('/verify', checkJwt, verify)

router.post('/validate', checkJwt, validate)

export default router
