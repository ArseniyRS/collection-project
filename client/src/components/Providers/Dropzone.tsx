import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import {DropzoneContext} from "../context/ModalContext";

const Dropzone = ({children}) => {
    const [dropzoneFileId, setDropzoneFileId] = useState()
    const onDropHandle = useCallback(acceptedFiles => {
        console.log(dropzoneFileId)
        console.log(acceptedFiles)
    }, [dropzoneFileId])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: onDropHandle})
    const {onBlur, onDragEnter, onDragLeave, onDragOver, onDrop, onFocus, onKeyDown, ref, tabIndex} = getRootProps()
    return (
        <div
            onBlur={onBlur}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            ref={ref}
            tabIndex={tabIndex}
        >
            <input {...getInputProps()} />
            <DropzoneContext.Provider value={{
                isDragActive, onDropHandle, setDropzoneFileId
            }}>
                {children}
            </DropzoneContext.Provider>

        </div>
    );
};

export default Dropzone;