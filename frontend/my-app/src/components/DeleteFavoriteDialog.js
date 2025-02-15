import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Spinner from "./Spinner";

const DeleteFavoriteDialog = ({ visible, onHide, loading, onConfirm }) => {
    return (
        <Dialog
            header="Supprimer des favoris"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onHide}
        >
            {loading ? (
                <div className="dialog-spinner-container">
                    <Spinner />
                </div>
            ) : (
                <div className="flex flex-col">
                    <p className="m-0">Voulez-vous vraiment supprimer cet article des favoris ?</p>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button severity="success" onClick={onConfirm}>Oui</Button>
                        <Button severity="danger" style={{ marginLeft: "10px" }} onClick={onHide}>Non</Button>
                    </div>
                </div>
            )}
        </Dialog>
    );
};

export default DeleteFavoriteDialog;