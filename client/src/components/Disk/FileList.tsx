import React, {useContext} from 'react';
import Dropzone from "../Providers/Dropzone";
import FileListEmptySpace from "./FileListEmptySpace";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import FileItem from "./FileItem";
import {useAppSelector} from "../../hooks/redux";

const FileList = ({moveHandler, openDirHandler}) => {
    const {files} = useAppSelector(state => state.fileReducer)
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
        <div className={'fileList'}>
            <div className="fileList__header">
                <div className="fileList__name">Название</div>
                <div className="fileList__size">Размер</div>
                <div className="fileList__date">Последнее изменение</div>
            </div>
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
            <Dropzone>
                <FileListEmptySpace />
            </Dropzone>
        </div>
    );
};

export default FileList;