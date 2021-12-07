import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createFileAction, getFilesAction, moveFileAction} from "../../store/actions/FileActions";
import FileList from "./FileList";
import '@s/disk.scss';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {Breadcrumbs, Button, Link} from "@mui/material";
import withDialogModal from "../../HOC/withDialogModal";
import {store} from "../../store";
import DialogModal from "../DialogModal/DialogModal";
import {arrayMove} from "react-sortable-hoc";
import {fileSlice} from "../../store/reducers/FilesSlice";

const Disk = ({openDialogModal}) => {
    const dispatch = useAppDispatch()
    const {currentDir, dirCrumbs, files} = useAppSelector(state => state.fileReducer)
    useEffect(() => {
        dispatch(getFilesAction(currentDir))
    }, [currentDir])
    const afterSubmit = (text) => {
        dispatch(createFileAction({
            name: text,
            type: 'dir',
            parent: currentDir
        }))
    }
    console.log(dirCrumbs)
    const moveHandler = (moveData) => {
        dispatch(moveFileAction(moveData))
    }
    const openDirHandler = (dir) => {
        dispatch(fileSlice.actions.writeDirCrumbs(dir))
        dispatch(fileSlice.actions.writeCurrentDir(dir.id))
    }
    // const backDirHandler = () => {
    //     const backDir = dirCrumbs.pop()
    //     console.log(backDir)
    //     dispatch(fileSlice.actions.writeCurrentDir(backDir))
    //    // dispatch(fileSlice.actions.writeDirCrumbs(backDir))
    // }
    return (
        <div className={'disk'}>
            <div className="disk-btns">
                <Button className="disk-btns__back" variant={'outlined'}
                        onClick={() => backDirHandler()}>Назад</Button>
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
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit"  href={'/'}>Мой диск</Link>
                {dirCrumbs.map(dir => <Link key={dir.id} color="inherit" href={dir.name}>{dir.name}</Link>)}
            </Breadcrumbs>
            <FileList openDirHandler={openDirHandler} moveHandler={moveHandler}/>
        </div>
    );
};

export default Disk;