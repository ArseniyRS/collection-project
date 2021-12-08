import fileService from '../services/fileService.js'
import {File} from '../models/models.js'
import {createFileName} from "../utils/createFileName.js";
import dbContext from "../db.js";
import {getAggregateValue} from "../utils/getAggregateValue.js";
import {Sequelize} from 'sequelize'

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = File.build({name, type, FileId: parent, UserId: req.user.id})
            if (!parent) {
                file.path = createFileName(file)
            } else {
                const parentFile = await File.findOne({where: {id: parent}})
                file.path = `${parentFile.path}\\${createFileName(file)}`
            }
            await fileService.createDir(file)
            const maxOrderId = await dbContext.query(`select max("orderId") from "Files" where "UserId" = ${req.user.id}`, {raw: true})
            file.orderId = getAggregateValue(maxOrderId) + 1
            await file.save()
            let files = []
            if (parent)
                files = await File.findAll({where: {UserId: req.user.id, FileId: parent}, order: ['orderId']})
            else
                files = await File.findAll({where: {UserId: req.user.id, FileId: null}, order: ['orderId']})
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        try {
            const {parent, search} = req.query
            console.log(search)
            let files = []
            if (search)
                files = await File.findAll({where: {UserId: req.user.id, name: {[Sequelize.Op.like]: `%${search}%`}}})
            else
                files = await File.findAll({where: {UserId: req.user.id, FileId: parent || null}, order: ['orderId']})
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Cant get files'})
        }
    }


    async move(req, res) {
        try {
            const {new_index, old_index, parent, fileId} = req.body
            if (parent) {
                const parentFile = await File.findOne({where: {id: +parent}})
                const movingFile = await File.findOne({where: {id: +fileId}})
                const fromPath = `${process.env.FILE_PATH}\\${req.user.id}\\${movingFile.path}`
                const toPath = `${process.env.FILE_PATH}\\${req.user.id}\\${parentFile.path}\\${movingFile.name}`
                await fileService.renameFile(fromPath, toPath)
                await movingFile.update({FileId: +parent, path: `${parentFile.path}\\${movingFile.name}`})
            } else {
                const firstFile = await File.findOne({where: {orderId: new_index}})
                const secondFile = await File.findOne({where: {orderId: old_index}})
                await firstFile.update({orderId: old_index})
                await secondFile.update({orderId: new_index})
            }
            const files = await File.findAll({where: {UserId: req.user.id}, order: ['orderId']})
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Move error'})

        }
    }
}

export default new FileController()




