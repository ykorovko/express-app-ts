import { Router } from 'express'

import { checkJwt } from '../../middlewares/checkJwt'

import auth from './auth'
import user from './user'

const router = Router()

router.use('/auth', auth)
router.use('/user', user)

export default router
