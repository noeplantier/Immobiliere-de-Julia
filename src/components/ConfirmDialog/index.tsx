// src/components/ConfirmDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

function ConfirmDialog({
  open,
  handleClose,
  handleConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirmer la suppression
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
