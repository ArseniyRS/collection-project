import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {useOutsideAlerter} from "../../hooks/useOutsideDetect";
import {changeFileColorAction, deleteFileAction, renameFileAction} from "../../store/actions/FileActions";
import {useAppDispatch} from "../../hooks/redux";
import {DropzoneContext, ModalContext} from "../context/ModalContext";
import {isBoolean} from "util";


const FileItem = ({id, name, color, size, updatedAt, FileId, type, openDir}) => {
    const {isDragActive, setDropzoneFileId} = useContext(DropzoneContext)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [elAnchor, setElAnchor] = useState(null)
    const [posMenu, setPosMenu] = useState({x: 0, y: 0})
    const closeMenu = () => setIsOpenMenu(false)
    useEffect(() => {
        if (type === 'dir')
            setDropzoneFileId(id)
    }, [])
    const handleOpenDir = () => {
        return () => type === 'dir' && openDir({id, name, FileId, type})
    }
    const handleContextMenu = () => {
        return (e) => {
            e.preventDefault()
            setElAnchor(e.currentTarget)
            setIsOpenMenu(true)
            setPosMenu({x: e.clientX, y: e.clientY})
        }
    }
    return (
        <>
            <div className={`fileItem ${(isDragActive && type === 'dir') && 'fileItem--dragActive'}`}
                 onDoubleClick={handleOpenDir()}
                 onContextMenu={handleContextMenu()}
            >
                {type === 'dir' ?
                    <FolderIcon className={"fileItem__img"} style={{color}}/>
                    :
                    <InsertDriveFileIcon className={"fileItem__img"} style={{color}}/>}
                <span className={"fileItem__name"}>{name}</span>
                <span className={"fileItem__size"}>{size}</span>
                <span className={"fileItem__date"}>{updatedAt.slice(0, 10)}</span>

            </div>
            {isOpenMenu &&
            <FileItemMenu
                id={id}
                name={name}
                color={color}
                closeMenu={closeMenu}
                pos={posMenu}/>

            }
        </>
    );
};
const FileItemMenu = ({id, name, color, closeMenu, pos}) => {
    const {openModal, setModalConfig} = useContext(ModalContext)
    const [isOpenColorPicker, setIsOpenColorPicker] = useState(false)
    const [anchorEl, setAnchorEl] = useState(false)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeMenu);
    const dispatch = useAppDispatch()
    const handleRename = () => {
        return (name) => dispatch(renameFileAction({id, name}))
    }
    const handleOpenModal = () => {
        return () => {
            setModalConfig({
                title: 'Переменовать',
                label: 'Название',
                defaultValue: name,
                okBtnLabel: 'ОК',
                cancelBtnLabel: 'Отмена',
                afterSubmit: handleRename()
            })
            openModal()
            closeMenu()
        }
    }
    const handleDelete = () => {
        return () => {
            dispatch(deleteFileAction(id))
            closeMenu()
        }
    }
    const handleOpenColorPicker = () => {
        return (e) => {
            setAnchorEl(e.currentTarget)
            setIsOpenColorPicker(true)
        }
    }
    return (
        <ul
            ref={wrapperRef}
            className={'fileItem-menu'}
            style={{
                position: 'absolute',
                top: pos.y,
                left: pos.x
            }}
        >
            <li className={'fileItem-menu__item'} onClick={handleOpenColorPicker()}>
                Изменить цвет
                {isOpenColorPicker &&
                <ColorMenu fileId={id} activeColor={color} setOpen={setIsOpenColorPicker} anchorEl={anchorEl}/>}
            </li>
            <li className={'fileItem-menu__item'} onClick={handleOpenModal()}>Переименовать</li>
            <li className={'fileItem-menu__item'} onClick={handleDelete()}>Удалить</li>
        </ul>
    )
}


const ColorMenu = ({fileId, activeColor, setOpen}) => {
    const dispatch = useAppDispatch()
    const handlePickColor = () => {
        return (color) => {
            dispatch(changeFileColorAction({id: fileId, color}))
            setOpen(false)
        }
    }
    const colors = ['#5191D2', '#FF9662', '#83D083', '#D087BF', '#79D0C6', '#D066C7', '#D05054']
    console.log(activeColor)
    return (

        <div className={'color-menu'}>
            {colors.map((color, index) => <div
                key={index}
                className={`color-menu__item ${color === activeColor ? 'color-menu__item--active' : ''}`}
                onClick={() => {
                    if (color !== activeColor)
                        dispatch(changeFileColorAction({id: fileId, color}))
                    return setOpen(false)
                }}
                style={{background: color}}/>)}
        </div>
    )
}
export default FileItem;