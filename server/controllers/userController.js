import {User} from "../models/models.js";
import ApiError from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import fileService from "../services/fileService.js";

class UserController {
    async registration(req, res, next) {
        try {
            const {email, username, password} = req.body
            const candidate = await User.findOne({where: {email}})
            if (candidate) return next(ApiError.badRequest("Пользователь с таким email уже существует"))
            const hashPassword = await bcrypt.hash(password, 5)

            const user = await User.create({email, username, password: hashPassword})
            await fileService.createDir({UserId: user.id, path: ''})
            return res.json({message: 'User was created', user})
        } catch (e) {
            return res.status(500).json({message: e})
        }
    }

    async login(req, res, next) {
        const {email, username, password} = req.body;
        const user = await User.findOne({where: email ? {email} : {username}});
        if (!user) return next(ApiError.badRequest('Пользователь не найден'))
        let comparePassword = await bcrypt.hash(password, user.password)
        if (!comparePassword) return next(ApiError.badRequest("Неверный пароль"))
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
            expiresIn: '24h'
        })
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })
    }
}

export default new UserController()