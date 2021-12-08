import React, {useCallback, useEffect, useRef, useState} from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {useOutsideAlerter} from "../../hooks/useOutsideDetect";
import DialogModal from "../DialogModal/DialogModal";


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
            <FileItemMenu id={id} isOpen={isOpenMenu} closeMenu={closeMenu} anchor={elAnchor} pos={posMenu}/>
            }
        </>
    );
};
const FileItemMenu = ({id, isOpen, closeMenu, anchor, pos}) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeMenu);

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
            <DialogModal
                title='Новая папка'
                label='Название'
                //afterSubmit={afterSubmit}
                component={(openDialogModal) => {
                    return <li className={'fileItem-menu__item'} onClick={()=>{
                        openDialogModal()
                        //closeMenu()

                    }}>Переименовать</li>
                }}/>
            <li className={'fileItem-menu__item'} onClick={() => {
                // dispatch(logoutAction())
                closeMenu()
            }}>Удалить
            </li>
        </ul>
    )
}
export default FileItem;