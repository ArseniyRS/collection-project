import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ModalContext} from "../context/ModalContext";

interface IDialogModalConfig {
    title?: string,
    label?: string,
    description?: string,
    defaultValue?: string | number,
    placeholder?: string,
    okBtnLabel?: string,
    cancelBtnLabel?: string,
    afterSubmit?: (text: string) => void
}

const DialogModal = ({children}) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('')
    const [modalConfig, setModalConfig] = React.useState<IDialogModalConfig>({
        title: '',
        label: 'Text',
        description: '',
        defaultValue: '',
        placeholder: '',
        afterSubmit: (text) => undefined,
        okBtnLabel: 'Ok',
        cancelBtnLabel: 'Cancel'
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{modalConfig.title}</DialogTitle>
                <DialogContent>
                    {modalConfig.description &&
                    <DialogContentText>
                        {modalConfig.description}
                    </DialogContentText>}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={modalConfig.label}
                        placeholder={modalConfig.placeholder}
                        defaultValue={modalConfig.defaultValue}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{modalConfig.cancelBtnLabel}</Button>
                    <Button onClick={() => {
                        handleClose()
                        modalConfig.afterSubmit(text)
                    }}>{modalConfig.okBtnLabel}</Button>
                </DialogActions>
            </Dialog>
            <ModalContext.Provider value={{
                openModal: handleClickOpen,
                closeModal: handleClose,
                setModalConfig: setModalConfig,
            }}>
                {children}
            </ModalContext.Provider>
        </>
    )
};

export default DialogModal;