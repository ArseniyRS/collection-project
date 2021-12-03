import fs from 'fs'

export const createFileName = (file, number = 1) => {
    const filePath = `${process.env.FILE_PATH}\\${file.UserId}\\${file.path}\\${file.name}`
    if (!fs.existsSync(filePath)) {
        return file.name
    }
    else {
        if (number > 1)
            file.name =  file.name.replace(/\(\d+\)/, `(${number})`)
        else
            file.name += ` (1)`
        return createFileName(file, number+1)
    }
}