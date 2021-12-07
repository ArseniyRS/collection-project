import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FileItem = ({id, name, size, updatedAt, FileId, type, openDir}) => {
    return (
        <div className={'fileItem'} onDoubleClick={() => type === 'dir' && openDir({id, name, FileId, type})}>
            {type === 'dir' ?
                <FolderIcon className={"fileItem__img"}/>
                :
                <InsertDriveFileIcon className={"fileItem__img"}/>}
            <span className={"fileItem__name"}>{name}</span>
            <span className={"fileItem__size"}>{size}</span>
            <span className={"fileItem__date"}>{updatedAt.slice(0, 10)}</span>
        </div>
    );
};

export default FileItem;