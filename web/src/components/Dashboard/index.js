import {
    Box, Button,
    Container, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import localforage from "localforage";
import axios from "axios";
import {useEffect, useState} from "react";
import * as React from "react";
import ModalCadastrar from "../ModalCadastrar";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteButton from "../DeleteButton";

export default function Dashboard(){

    const [token, setToken] = useState('');
    const [data, setData] = useState([]);

    const fetchData = async (event) => {

        try {
            const value = await localforage.getItem('token');

            if (!value || !value.access_token) {
                window.location.href = '/login';
                return;
            }

            setToken(value.access_token);

            const response = await axios.get('http://localhost:8000/api/v1/empresas/', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${value.access_token}`
                }
            });

            setData(response.data.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async () => {
        await fetchData();
    };

    return(
        <Container component="main" sx={{ bgcolor: 'background.default'}}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
                    <Typography component="h1" variant="h4" sx={{color: 'text.primary'}}>
                        Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                        <Button variant="outlined" onClick={handleUpdate}>Atualizar</Button>
                        <ModalCadastrar button="Cadastrar" onClose={handleUpdate}/>
                    </Box>
                </Box>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>CNPJ</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Telefone</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => (
                            <TableRow key={row.id_empresa}>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.cnpj}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.telefone}</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <ModalCadastrar data={row} button="Editar" icon={<CreateOutlinedIcon />}/>
                                        <DeleteButton row={row} func={handleUpdate}/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}