import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Fade,
	Modal,
	TextField,
	Typography,
	Alert, AlertTitle, experimentalStyled
} from "@mui/material";
import * as React from "react";
import axios from "axios";
import localforage from "localforage";
import { useState } from "react";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: 2,
	p: 4,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
};

interface FormData {
	id_empresa?: number;
	nome: string;
	cnpj: string;
	email: string;
	telefone: string;
}

interface Token {
	access_token: string;
}

interface ModalCadastrarProps {
	onClose?: () => void;
	data?: FormData;
	icon?: React.ReactNode;
	button?: string;
}

const StyledFade = experimentalStyled(Fade)({
	display: 'flex',
	// Adicione outros estilos conforme necessário
});


const ModalCadastrar: React.FC<ModalCadastrarProps> = (props) => {

	const { onClose, data } = props;

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState<FormData>(data || {
		nome: '',
		cnpj: '',
		email: '',
		telefone: '',
	});
	const [errors, setErrors] = useState<string[]>([]);
	const [success, setSuccess] = useState(false);

	const TYPES: { [key: string]: string } = {
		cnpj: "99.999.999/9999-99",
		telefone: "(99) 99999-9999",
	}

	function applyMask(value: string, name: string) {
		if (TYPES[name] === undefined) return value;
		value = (value as string).replace(/[^0-9]/g, "");
		const mask = TYPES[name];
		let result = "";

		let inc = 0;
		Array.from(value).forEach((letter, index) => {
			while (
				mask[index + inc] !== undefined &&
				mask[index + inc].match(/[0-9]/) === null
			) {
				result += mask[index + inc];
				inc++;
			}
			result += letter;
		});
		return result;
	}

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, length: number | null = null): void => {

		if (length !== null && event.target.value.length > length)
			return;

		event.target.value = applyMask(event.target.value, event.target.name);

		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const validateData = (): boolean => {
		let errorsAux: string[] = [];
		if (formData.nome === '') { }
		errorsAux.push('O campo nome é obrigatório');

		if (formData.cnpj === '')
			errorsAux.push('O campo CNPJ é obrigatório');
		else if (formData.cnpj.length !== 18)
			errorsAux.push('O campo CNPJ deve ter 18 caracteres');

		if (formData.email === '')
			errorsAux.push('O campo e-mail é obrigatório');

		if (formData.telefone === '')
			errorsAux.push('O campo telefone é obrigatório');
		else if (formData.telefone.length !== 15)
			errorsAux.push('O campo telefone deve ter 15 caracteres');

		setErrors(errorsAux);
		return errorsAux.length === 0;
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setLoading(true);

		let valid = validateData();
		if (!valid) {
			setLoading(false);
			return;
		}

		const value: Token | null = await localforage.getItem('token');

		if (!value || !value.access_token) {
			window.location.href = '/login';
			return;
		}

		if (formData.id_empresa === undefined) {
			await axios.post("http://localhost:8000/api/v1/empresas", formData, {
				headers: {
					"Accept": "application/json",
					'Authorization': `Bearer ${value.access_token}`
				}
			}).then((response) => {
				setLoading(false);
				setSuccess(true);
			}).catch((error) => {
				setLoading(false);
				setErrors(error.response.data.errors);
			});
		} else {
			await axios.patch("http://localhost:8000/api/v1/empresas/" + formData.id_empresa, formData, {
				headers: {
					"Accept": "application/json",
					'Authorization': `Bearer ${value.access_token}`
				}
			}).then((response) => {
				setLoading(false);
				setSuccess(true);
			}).catch((error) => {
				setLoading(false);
				setErrors(error.response.data.errors);
			});
		}

		setTimeout(() => {
			setSuccess(false);
			setFormData({
				nome: '',
				cnpj: '',
				email: '',
				telefone: ''
			});
			if (onClose) {
				onClose();
			}
			handleClose();
		}, 3000);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button variant="outlined" onClick={handleOpen} startIcon={props.icon}>{props.button}</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{ overflow: 'scroll' }}
			>
				<Box sx={style}>
					<Typography component="h1" variant="h4" sx={{ color: 'text.primary' }}>{props.button}</Typography>
					<Box sx={{ display: success || loading || errors.length > 0 ? 'flex' : 'none', flexDirection: 'column' }}>
						<StyledFade  in={loading} sx={{ display: loading ? 'flex' : 'none' }}>
							<CircularProgress />
						</StyledFade >
						<StyledFade  in={success} sx={{ display: success ? 'flex' : 'none' }}>
							<Alert severity="success" sx={{ mb: 2 }}>
								<AlertTitle>Empresa salva com sucesso!</AlertTitle>
							</Alert>
						</StyledFade >
						{errors.map(error => (
							<Alert severity="error" sx={{ mb: 2 }} key={error}>
								<AlertTitle>{error}</AlertTitle>
							</Alert>
						))}
					</Box>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									autoComplete="given-name"
									name="nome"
									required
									fullWidth
									id="nome"
									label="Nome"
									value={formData.nome}
									onChange={handleChange}
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									name="cnpj"
									label="CNPJ"
									type="cnpj"
									id="cnpj"
									value={formData.cnpj}
									onChange={(event) => handleChange(event, 18)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									name="email"
									label="E-mail"
									type="email"
									id="email"
									value={formData.email}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									name="telefone"
									label="Telefone"
									type="telefone"
									id="telefone"
									value={formData.telefone}
									onChange={(event) => handleChange(event, 15)}
								/>
							</Grid>
						</Grid>
						<Box sx={{ display: 'flex', gap: 2 }}>
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								sx={{ mt: 3, mb: 2 }}
								color="error"
								onClick={handleClose}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								sx={{ mt: 3, mb: 2 }}
								color="success"
							>
								Enviar
							</Button>
						</Box>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}

export default ModalCadastrar;