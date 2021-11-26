import fs from 'fs'
import File from '../models/File.js'

class FileService {
    createDir(file) {
        console.log(file)
        const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`
        return new Promise((res, rej) => {
            try {
                if (!fs.existsSync(file)) {
                    fs.mkdirSync(filePath)
                    return res({message: 'File was created'})
                } else {
                    return rej({message: 'File already exist'})
                }
            } catch (e) {
                console.log(e)
                return rej({message: 'File error'})
            }
        })
    }
}
const fileService = new FileService()
export default fileService