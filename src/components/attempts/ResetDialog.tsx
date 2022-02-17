import { DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog, Button } from '@mui/material'
import React, { useState } from 'react'
import { NavigateFunction } from 'react-router-dom';

import { deleteExamData } from '../../services/handleExam';

interface ResetDialogProps {
    email: string | undefined;
    navigate: NavigateFunction;
}

const ResetDialog = (porps: ResetDialogProps) => {
    const { email, navigate } = porps;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false,)
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>Restart test</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your progress will be lost
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={(e) => { deleteExamData(email, navigate) }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ResetDialog
