import fs from 'fs'
import {File} from "../models/models.js";
import {Sequelize} from "sequelize";

//import {File} from '../models/File.js'

class FileService {
    createDir(file) {
        const filePath = `${process.env.FILE_PATH}\\${file.UserId}\\${file.path}`
        return new Promise((res, rej) => {
            try {
                fs.mkdirSync(filePath)
                return res({message: 'File was created'})
            } catch (e) {
                console.log(e)
                return rej({message: 'File error'})
            }
        })
    }

    renameFile(from, to) {
        return new Promise((res, rej) => {
            try {
                fs.renameSync(from, to)
                return res({message: 'File was moved'})
            } catch (e) {
                return rej({message: 'Move file error'})
            }
        })
    }

    deleteFile(path, type, user) {
        return new Promise((res, rej) => {
            try {
                const joinedPath = `${process.env.FILE_PATH}\\${user}\\${path}`
                if (type === 'dir')
                    fs.rmSync(joinedPath, {recursive: true, force: true})
                else
                    fs.unlinkSync(joinedPath)
                return res({message: 'File was deleted'})
            } catch (e) {
                return rej({message: 'File delete error'})
            }
        })
    }

    async getFilesWithCurDir(parent, user) {
        try {
            let files = await File.findAll({where: {UserId: user, FileId: parent === 'null' ?  null : parent},  order: ['orderId']})
            return files
        } catch (e) {
            console.log(e)
        }
    }
}

const fileService = new FileService()
export default fileService