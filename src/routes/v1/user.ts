import { Router } from 'express'

import { edit, me } from '../../controllers/user'
import { checkJwt } from '../../middlewares/checkJwt'

const router = Router()

router.get('/', checkJwt, me)

router.post('/', checkJwt, edit)

export default router
