import fs from 'fs'
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
}

const fileService = new FileService()
export default fileService