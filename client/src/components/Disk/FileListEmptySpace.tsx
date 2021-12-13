import React, {useContext, useEffect} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {DropzoneContext} from "../context/ModalContext";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import Dropzone from "../Providers/Dropzone";
import FileItem from "./FileItem";

const FileListContainer = ({moveHandler, openDirHandler}) => {
    const {files} = useAppSelector(state => state.fileReducer)
    const {isDragActive, setDropzoneFileId} = useContext(DropzoneContext)
    useEffect(()=>{
        setDropzoneFileId(null)
    },[])
    const handleOnDragEnd = (res) => {
        if (res.combine)
            return moveHandler({
                parent: res.combine.droppableId,
                fileId: res.draggableId
            })
        return moveHandler({
            old_index: res.source.index,
            new_index: res.destination.index > files[files.length - 1].orderId ? res.destination.index - 1 : res.destination.index
        })
    }
    return (
        <div className={`fileList-container ${isDragActive && 'fileList-container--dragActive'}`}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {files.map((file, index) => {
                    return (
                        <Dropzone key={file.id}>
                            <Droppable droppableId={file.id.toString()} isCombineEnabled>
                                {(provided) => (
                                    <div className="characters" {...provided.droppableProps}
                                         ref={provided.innerRef}>
                                        <Draggable draggableId={file.id.toString()} index={file.orderId}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <FileItem openDir={openDirHandler}  {...file}/>
                                                </div>
                                            )}
                                        </Draggable>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Dropzone>
                    )
                })}
            </DragDropContext>
        </div>
    );
};

export default FileListContainer;