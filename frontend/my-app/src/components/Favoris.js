import React from "react";
import { Button } from "primereact/button";
import Spinner from "./Spinner";
import { Dialog } from "primereact/dialog";

const FavoriteDialog = ({ visible, onHide, loading, onConfirm }) => {
    return (
        <Dialog
            header="Ajout au favoris"
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
                    <p className="m-0">Voulez-vous vraiment ajouter cet article aux favoris ?</p>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button severity="success" onClick={onConfirm}>Oui</Button>
                        <Button severity="danger" style={{ marginLeft: "10px" }} onClick={onHide}>Non</Button>
                    </div>
                </div>
            )}
        </Dialog>
    );
};

export default FavoriteDialog;