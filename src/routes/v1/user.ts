import { Router } from 'express'

import { me } from '../../controllers/user'
import { checkJwt } from '../../middlewares/checkJwt'

const router = Router()

router.get('/', checkJwt, me)

export default router
