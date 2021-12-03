import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createFileAction, getFilesAction, moveFileAction} from "../../store/actions/FileActions";
import FileList from "./FileList";
import '@s/disk.scss';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {Button} from "@mui/material";
import withDialogModal from "../../HOC/withDialogModal";
import {store} from "../../store";
import DialogModal from "../DialogModal/DialogModal";
import {arrayMove} from "react-sortable-hoc";
import {fileSlice} from "../../store/reducers/FilesSlice";

const Disk = ({openDialogModal}) => {
    const dispatch = useAppDispatch()
    const {currentDir, files} = useAppSelector(state => state.fileReducer)
    useEffect(() => {
        dispatch(getFilesAction(currentDir))
    }, [currentDir])
    const afterSubmit = (text) => {
        dispatch(createFileAction({
            name: text,
            type: 'dir'
        }))
    }

    return (
        <div className={'disk'}>
            <div className="disk-btns">
                <Button className="disk-btns__back" variant={'outlined'}>Назад</Button>
                <DialogModal
                    title='Новая папка'
                    label='Название'
                    afterSubmit={afterSubmit}
                    component={(openDialogModal) => {
                        return (
                            <Button
                                className="disk-btns__create" variant={'contained'}
                                onClick={() => openDialogModal()}>Создать <CreateNewFolderIcon/></Button>
                        )
                    }}
                />
            </div>
            <FileList />
        </div>
    );
};

export default Disk;