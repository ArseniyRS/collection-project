import React, {useContext, useEffect} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {DropzoneContext} from "../context/ModalContext";


const FileListEmptySpace = () => {
    const {files} = useAppSelector(state => state.fileReducer)
    const {isDragActive, setDropzoneFileId} = useContext(DropzoneContext)
    useEffect(()=>{
        setDropzoneFileId(null)
    },[])

    return (
        <div className={`fileList__emptySpace ${isDragActive && 'fileList__emptySpace--dragActive'}`}/>
    );
};

export default FileListEmptySpace;