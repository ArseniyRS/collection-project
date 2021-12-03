import {Router} from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import fileController from "../controllers/fileController.js";
const router = new Router()

router.post('/', authMiddleware, fileController.createDir)
router.get('/', authMiddleware, fileController.getFiles)
router.post('/move', authMiddleware, fileController.move)
export default router
