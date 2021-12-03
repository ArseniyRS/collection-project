import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {SortableElement} from "react-sortable-hoc";

const FileItem = (props) => {
    return (
        <div className={'fileItem'}>
            {props.type === 'dir' ?
                <FolderIcon className={"fileItem__img"}/>
                :
                <InsertDriveFileIcon className={"fileItem__img"}/>}
            <span className={"fileItem__name"}>{props.name}</span>
            <span className={"fileItem__size"}>{props.size}</span>
            <span className={"fileItem__date"}>{props.updatedAt.slice(0,10)}</span>
        </div>
    );
};

export default FileItem;