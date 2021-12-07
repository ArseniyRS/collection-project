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

    // const fromPath = `${process.env.FILE_PATH}\\${user}\\${from}`
    // const toPath = `${process.env.FILE_PATH}\\${user}\\${move ? `${from}\\${to}` : to}`
    // return new Promise((res, rej) => {
    //     try {
    //         // console.log(fromPath)
    //         //console.log(toPath)
    //         fs.rename(fromPath, toPath, function (err) {
    //             if (err) {
    //                 return rej({message: 'Move file error'})
    //             }
    //         })
    //         return res({message: 'File was moved'})
    //     } catch (e) {
    //         return rej({message: 'Move file error'})
    //     }
    // })
}

const fileService = new FileService()
export default fileService