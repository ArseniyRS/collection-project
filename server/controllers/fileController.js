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

    async deleteFile(req, res) {
        try {
            const {id} = req.query
            if(!id)
                return res.json(400).badRequest({message: 'Id error'})
            const file = await File.findOne({where: {id: id}})
            await fileService.deleteFile(file.path, file.type, req.user.id)
            await file.destroy({
                where: {id: id, UserId: req.user.id,}
            })
            return res.json(file)
        } catch (e) {
            return res.status(500).json({message: 'Delete file error'})
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
    async rename(req,res){
        try{
            const {id, name} = req.body
            if(!id || !name)
               return res.status.json(400).badRequest({message: 'Req message error'})
            const file = await File.findOne({where: {id}})
            const oldPathName = `${process.env.FILE_PATH}\\${req.user.id}\\${file.path}`
            let newPathName =  ''
            if(file.FileId){
                const parentFile = await File.findOne({where: {id: file.FileId}})
                newPathName = `${process.env.FILE_PATH}\\${req.user.id}\\${parentFile.path}\\${name}`
                await file.update({
                    path: `\\${parentFile.path}\\${name}`,
                    name
                })
            }else{
                newPathName = `${process.env.FILE_PATH}\\${req.user.id}\\${name}`
                await file.update({
                    path: name,
                    name
                })
            }
            await fileService.renameFile(oldPathName,newPathName)
            return res.json(file)
        }catch (e) {
            return res.status(500).json({message: 'Cant rename file'})
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




