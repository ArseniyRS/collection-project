import {Router} from 'express'
import fileRouter from './file.routes.js'
import userRouter from './user.routes.js'
const router = new Router()

router.use('/files', fileRouter)
router.use('/auth', userRouter)

export default router
