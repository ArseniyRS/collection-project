import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

const DialogModal = ({title, description = '', defaultValue = '', placeholder = "", label, afterSubmit, component}) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {description &&
                    <DialogContentText>
                        {description}
                    </DialogContentText>}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={label}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={() => {
                        handleClose()
                        afterSubmit(text)
                    }}>Создать</Button>
                </DialogActions>
            </Dialog>
            {component(handleClickOpen)}
            {/*{React.cloneElement(component, {*/}
            {/*    openDialogModal: handleClickOpen*/}
            {/*})}*/}
        </>
    )
};

export default DialogModal;