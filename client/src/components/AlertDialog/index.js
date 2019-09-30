import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

    const { show, dialog, releaseListener } = props;  

    const [open, setOpen] = React.useState(show);

    const handleClickOpen = () => {
        setOpen(true);
        releaseListener(true, dialog.key_response)
    };

    const handleClose = () => {
        setOpen(false);
        releaseListener(false, dialog.key_response)
    };
    const handleAccept = () => {
        setOpen(false);
        releaseListener(true, dialog.key_response)
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Sem saldo</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialog.message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button value="false" onClick={handleClose} color="primary">
                    Recusar
                </Button>
                <Button value="true" onClick={handleAccept} color="primary" autoFocus>
                    Aceitar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}