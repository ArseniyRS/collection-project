import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {useOutsideAlerter} from "../../hooks/useOutsideDetect";
import DialogModal from "../DialogModal/DialogModal";
import {deleteFileAction, renameFileAction} from "../../store/actions/FileActions";
import {useAppDispatch} from "../../hooks/redux";
import {ModalContext} from "../context/ModalContext";


const FileItem = ({id, name, size, updatedAt, FileId, type, openDir}) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [elAnchor, setElAnchor] = useState(null)
    const [posMenu, setPosMenu] = useState({x: 0, y: 0})
    const closeMenu = () => setIsOpenMenu(false)
    console.log(posMenu)
    return (
        <>
            <div className={'fileItem'} onDoubleClick={() => type === 'dir' && openDir({id, name, FileId, type})}
                 onContextMenu={(e) => {
                     e.preventDefault()
                     setElAnchor(e.currentTarget)
                     setIsOpenMenu(true)
                     setPosMenu({x: e.clientX, y: e.clientY})
                 }}
            >
                {type === 'dir' ?
                    <FolderIcon className={"fileItem__img"}/>
                    :
                    <InsertDriveFileIcon className={"fileItem__img"}/>}
                <span className={"fileItem__name"}>{name}</span>
                <span className={"fileItem__size"}>{size}</span>
                <span className={"fileItem__date"}>{updatedAt.slice(0, 10)}</span>

            </div>
            {isOpenMenu &&
            <FileItemMenu
                id={id}
                name={name}
                isOpen={isOpenMenu}
                closeMenu={closeMenu}
                anchor={elAnchor}
                pos={posMenu}/>
            }
        </>
    );
};
const FileItemMenu = ({id, isOpen, name, closeMenu, anchor, pos}) => {
    const {openModal, setModalConfig} = useContext(ModalContext)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeMenu);
    const dispatch = useAppDispatch()
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
            <li className={'fileItem-menu__item'} onClick={() => {
                setModalConfig({
                    title: 'Переменовать',
                    label: 'Название',
                    defaultValue: name,
                    okBtnLabel: 'ОК',
                    cancelBtnLabel: 'Отмена',
                    afterSubmit: (name) => dispatch(renameFileAction({id, name}))
                })
                openModal()
                closeMenu()
            }}>Переименовать
            </li>
            <li className={'fileItem-menu__item'} onClick={() => {
                dispatch(deleteFileAction(id))
                closeMenu()
            }}>Удалить
            </li>
        </ul>
    )
}
export default FileItem;