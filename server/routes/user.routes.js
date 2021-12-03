import {Router} from 'express'
import userController from "../controllers/userController.js";
const router = new Router();

router.post(
    "/sign-up",
    userController.registration
);
router.post(
    "/sign-in",
    userController.login
)


export default router
