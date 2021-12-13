import fs from 'fs'

export const createFileName = ({name, path = '', UserId, type = 'dir'}, number = 1) => {
    const filePath = `${process.env.FILE_PATH}\\${UserId}\\${path}\\${name}.${type}`
    if (!fs.existsSync(filePath)) {
        return  type === 'dir' ? name : `${name}.${type}`
    } else {
        if (number > 1)
            name = name.replace(/\(\d+\)/, `(${number})`)
        else
            name += ` (1)`
        return createFileName({name, path, UserId, type}, number + 1)
    }
}