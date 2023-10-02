import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {Button} from "@mui/material";
import * as React from "react";
import localforage from "localforage";

export default function DeleteButton(props){
    const row = props.row;
    const func = props.func;
    const handleDeletion = async (id) => {
        const value = await localforage.getItem('token');

        if (!value || !value.access_token) {
            window.location.href = '/login';
            return;
        }
        const response = await axios.delete('http://localhost:8000/api/v1/empresas/' + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + value.access_token,
            }
        }).then((response) => {
            func();
        });

        return response;
    };

    return(
        <Button startIcon={<DeleteOutlineIcon/>} variant="outlined" color="error" onClick={() => handleDeletion(row.id_empresa)}>Excluir</Button>
    );
}