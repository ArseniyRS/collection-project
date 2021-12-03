import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";


const withDialogModal = ({title, description, label, afterSubmit}) => {

    return (Component) => {

        return (props) => {
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
                    <Component {...props} openDialogModal={handleClickOpen}/>
                </>
            )
        }
    }

};

export default withDialogModal;