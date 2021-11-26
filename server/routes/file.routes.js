import {Router} from 'express'
const router = new Router()
import authMiddleware from '../middleware/auth.middleware.js'
import fileController from "../controllers/fileController.js";

router.post('', authMiddleware, fileController.createDir)
export default router