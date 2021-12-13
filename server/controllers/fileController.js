import fileService from '../services/fileService.js'
import {File, User} from '../models/models.js'
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
            let files = await fileService.getFilesWithCurDir(parent, req.user.id)
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async deleteFile(req, res) {
        try {
            const {id, parent} = req.query
            if (!id)
                return res.json(400).badRequest({message: 'Id error'})
            const file = await File.findOne({where: {id: id}})
            await fileService.deleteFile(file.path, file.type, req.user.id)
            await file.destroy({
                where: {id: id, UserId: req.user.id,}
            })
            let files = await fileService.getFilesWithCurDir(parent, req.user.id)
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Delete file error'})
        }
    }

    async getFiles(req, res) {
        try {
            const {parent, search} = req.query
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


    async rename(req, res) {
        try {
            const {id, name, parent} = req.body
            if (!id || !name)
                return res.status.json(400).badRequest({message: 'Req message error'})
            const file = await File.findOne({where: {id}})
            const oldPathName = `${process.env.FILE_PATH}\\${req.user.id}\\${file.path}`
            let newPathName = ''
            if (file.FileId) {
                const parentFile = await File.findOne({where: {id: file.FileId}})
                newPathName = `${process.env.FILE_PATH}\\${req.user.id}\\${parentFile.path}\\${name}`
                await file.update({
                    path: `\\${parentFile.path}\\${name}`,
                    name
                })
            } else {
                newPathName = `${process.env.FILE_PATH}\\${req.user.id}\\${name}`
                await file.update({
                    path: name,
                    name
                })
            }
            await fileService.renameFile(oldPathName, newPathName)
            let files = await fileService.getFilesWithCurDir(parent, req.user.id)
            console.log(files)
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Cant rename file'})
        }
    }

    async changeColor(req, res) {
        try {
            const {id, color} = req.body
            const file = await File.findOne({where: id})
            await file.update({color})
            let files = await fileService.getFilesWithCurDir(file.FileId, req.user.id)
            console.log(files)
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Cant change file color'})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const user = await User.findOne({where: {id: req.user.id}})
            if (user.usedSpace + file.size > user.storageSpace) {
                return res.status(400).json({message: 'No space on the disk'})
            }
            const maxOrderId = await dbContext.query(`select max("orderId") from "Files" where "UserId" = ${req.user.id}`, {raw: true})
            const type = file.name.split('.').pop()
            const nameWithOutExt = file.name.split('.').slice(0, -1).join('.')
            let newName = file.name
            if (req.body.parent) {
                const parent = await File.findOne({where: {UserId: req.user.id, id: req.body.parent}})
                newName = createFileName({
                    name: nameWithOutExt,
                    UserId: req.user.id,
                    path: parent.path,
                    type
                })
                await file.mv(`${process.env.FILE_PATH}\\${req.user.id}\\${parent.path || ''}\\${newName}`)

                const newFile = File.build({
                    name: newName,
                    size: file.size,
                    path: `${parent.path}/${newName}`,
                    type,
                    FileId: req.body.parent,
                    orderId: getAggregateValue(maxOrderId) + 1,
                    UserId: req.user.id
                })
                await newFile.save()
            }
            newName = createFileName({
                name: nameWithOutExt,
                UserId: req.user.id,
                type
            })
            await file.mv(`${process.env.FILE_PATH}\\${req.user.id}\\${newName}`)
            await File.create({
                name: newName,
                type,
                path: newName,
                size: file.size,
                orderId: getAggregateValue(maxOrderId) + 1,
                UserId: req.user.id
            })
            await user.update({
                usedSpace: user.usedSpace + file.size
            })
            let files = await fileService.getFilesWithCurDir(req.body.parent, req.user.id)
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'upload file error'})
        }
    }

    async move(req, res) {
        try {
            const {new_index, old_index, parent, fileId} = req.body
            let files = []
            if (parent) {
                const parentFile = await File.findOne({where: {id: +parent}})
                const movingFile = await File.findOne({where: {id: +fileId}})
                const fromPath = `${process.env.FILE_PATH}\\${req.user.id}\\${movingFile.path}`
                const toPath = `${process.env.FILE_PATH}\\${req.user.id}\\${parentFile.path}\\${movingFile.name}`
                await fileService.renameFile(fromPath, toPath)
                await movingFile.update({FileId: +parent, path: `${parentFile.path}\\${movingFile.name}`})
                files = await File.findAll({where: {FileId: parentFile.FileId}})
            } else {
                const firstFile = await File.findOne({where: {orderId: new_index}})
                const secondFile = await File.findOne({where: {orderId: old_index}})
                await firstFile.update({orderId: old_index})
                await secondFile.update({orderId: new_index})
                files = await File.findAll({where: {FileId: firstFile.FileId}})
            }

            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Move error'})

        }
    }
}

export default new FileController()




