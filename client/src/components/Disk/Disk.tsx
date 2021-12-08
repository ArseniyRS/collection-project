import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createFileAction, getFilesAction, moveFileAction} from "../../store/actions/FileActions";
import FileList from "./FileList";
import '@s/disk.scss';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {Button, TextField} from "@mui/material";
import DialogModal from "../DialogModal/DialogModal";
import {fileSlice} from "../../store/reducers/FilesSlice";
import FileBreadcrumbs from "./FileBreadcrumbs";
import {useHistory} from 'react-router-dom'
import SearchIcon from "@mui/icons-material/Search";
import {Search} from "@mui/icons-material";
import FileSearch from "./FileSearch";

const Disk = ({openDialogModal}) => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const {currentDir, dirCrumbs, textSearch, files} = useAppSelector(state => state.fileReducer)
    useEffect(() => {
        dispatch(getFilesAction({parent: currentDir}))
    }, [currentDir])
    useEffect(() => {
        dispatch(getFilesAction({search: textSearch}))
    }, [textSearch])
    useEffect(() => {
        if (dirCrumbs.length)
            dispatch(fileSlice.actions.writeCurrentDir(dirCrumbs[dirCrumbs.length - 1].id))
        else
            dispatch(fileSlice.actions.writeCurrentDir(null))
        const res = dirCrumbs.reduce((prev, cur) => prev + `/${cur.name}`, '')
        history.push(res)
    }, [dirCrumbs])

    const afterSubmit = (text) => {
        dispatch(createFileAction({
            name: text,
            type: 'dir',
            parent: currentDir
        }))
    }

    const moveHandler = (moveData) => {
        dispatch(moveFileAction(moveData))
    }
    const openDirHandler = (dir) => {
        dispatch(fileSlice.actions.writeDirCrumbs([...dirCrumbs, dir]))
    }

    const backDirHandler = () => {
        const copyDirCrumbs = [...dirCrumbs]
        copyDirCrumbs.pop()
        dispatch(fileSlice.actions.writeDirCrumbs([...copyDirCrumbs]))
    }

    const crumbDirHandler = (index) => {
        dispatch(fileSlice.actions.writeDirCrumbs(dirCrumbs.slice(0, index + 1)))
    }

    const searchFiles = (text) => {
        dispatch(fileSlice.actions.writeTextSearch(text))
    }
    return (
        <div className={'disk'}>
            <div className="disk-manager">
                <div className="disk-btns">
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
                    {currentDir &&
                    <Button className="disk-btns__back" variant={'outlined'}
                            onClick={() => backDirHandler()}>Назад</Button>}
                </div>
                <div className={'disk-management'}>

                    <FileBreadcrumbs crumbDirHandler={crumbDirHandler}/>
                    <FileSearch onSearch={searchFiles}/>
                </div>
            </div>


            <FileList openDirHandler={openDirHandler} moveHandler={moveHandler}/>
        </div>
    );
};

export default Disk;