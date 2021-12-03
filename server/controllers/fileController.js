import fileService from '../services/fileService.js'
import {File} from '../models/models.js'
import {createFileName} from "../utils/createFileName.js";
import dbContext from "../db.js";
import {getAggregateValue} from "../utils/getAggregateValue.js";

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = File.build({name, type, parent, UserId: req.user.id})
            if (!parent) {
                file.path = createFileName(file)
            } else {
                const parentFile = await File.findOne({where: {_id: parent}})
                file.path = `${parentFile.path}\\${createFileName(file)}`
                await parentFile.update({File: file._id}, {where: {_id: parentFile._id}})
            }
            const maxOrderId = await dbContext.query(`select max("orderId") from "Files" where "UserId" = ${req.user.id}`, {raw: true})
            file.orderId = getAggregateValue(maxOrderId) + 1
            await file.save()
            await fileService.createDir(file)
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        try {
            const files = await File.findAll({where: {UserId: req.user.id}, order: ['orderId']})
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Cant get files'})
        }
    }


    async move(req, res) {
        try {
            const {new_index, old_index} = req.body
            const firstFile = await File.findOne({where: {orderId: new_index}})
            const secondFile = await File.findOne({where: {orderId: old_index}})
            await firstFile.update({orderId: old_index})
            await secondFile.update({orderId: new_index})
            const files = await File.findAll({where: {UserId: req.user.id}, order: ['orderId']})
            return res.json(files)
            //return await this.getFiles(req, res)
        } catch (e) {
            return res.status(500).json({message: 'Move error'})

        }
    }
}

export default new FileController()




