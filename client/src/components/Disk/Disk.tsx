import React, {useContext, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createFileAction, getFilesAction, moveFileAction} from "../../store/actions/FileActions";
import FileList from "./FileList";
import '@s/disk.scss';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {Button, TextField} from "@mui/material";
import {fileSlice} from "../../store/reducers/FilesSlice";
import FileBreadcrumbs from "./FileBreadcrumbs";
import {useHistory} from 'react-router-dom'
import FileSearch from "./FileSearch";
import {ModalContext} from "../context/ModalContext";

const Disk = () => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const {currentDir, dirCrumbs, textSearch} = useAppSelector(state => state.fileReducer)

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

    const {openModal, setModalConfig} = useContext(ModalContext)

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
    const handleClickOpenModal = () => {
        return () => {
            setModalConfig({
                title: 'Создать папку',
                label: 'Название',
                defaultValue: name,
                okBtnLabel: 'ОК',
                cancelBtnLabel: 'Отмена',
                afterSubmit: handleCreateFolder()
            })
            openModal()
        }
    }
    const handleCreateFolder = () => {
        return (text) => dispatch(createFileAction({
            name: text,
            type: 'dir',
            parent: currentDir
        }))
    }
    return (
        <div className={'disk'}>
            <div className="disk-manager">
                <div className="disk-btns">
                    <Button
                        className="disk-btns__create" variant={'contained'}
                        onClick={handleClickOpenModal()}>Создать<CreateNewFolderIcon/>
                    </Button>
                    {currentDir &&
                    <Button className="disk-btns__back" variant={'outlined'}
                            onClick={backDirHandler}>Назад</Button>}
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