import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import FileItem from "./FileItem";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const FileList = () => {
    const {files} = useAppSelector(state => state.fileReducer)
    const handleOnDragEnd = (res) => {
        console.log(res)
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
                        <Droppable droppableId={file.id.toString()} key={file.id.toString()} isCombineEnabled>
                            {(provided) => (
                                <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                    <Draggable  draggableId={file.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <FileItem {...file}/>
                                            </div>
                                        )}
                                    </Draggable>

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )
                })}
            </DragDropContext>
        </div>
    );
};

export default FileList;