import * as React from 'react';
import {Button, Box, Container, Grid, TextField, Typography, Link, Fade, AlertTitle, Alert} from '@mui/material';
import axios from 'axios';
import localforage from "localforage";

export default function Registrar() {

	const [formData, setFormData] = React.useState({
		user: '',
		password: ''
	});
	const handleChange = (event, length = null) => {

		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const [errors, setErrors] = React.useState([]);

	const errorsList = (errors) => {
		let errorsAux = Object.keys(errors).map((key) => {
			return errors[key][0];
		})
		setErrors(errorsAux);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		await axios.post('http://localhost:8000/api/v1/register/', {
			password: formData.password,
			user: formData.user
		}).then((response) => {
			localforage.setItem('token', response.data.token.original);
			window.location.href = '/';
		}).catch((error) => {
			errorsList(error.response.data.errors);
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
			>
				<Typography component="h1" variant="h3" sx={{mb: 2}}>
					Registrar
				</Typography>
				{errors.map(error => (
					<Alert severity="error" sx={{mb: 2}} key={error}>
						<AlertTitle>{error}</AlertTitle>
					</Alert>
				))}
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
							name="user"
							required
							fullWidth
							id="user"
							label="Usuário"
							onChange={handleChange}
							autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
							required
							fullWidth
							name="password"
							label="Senha"
							onChange={handleChange}
							type="password"
							id="password"
							/>
						</Grid>
					</Grid>
					<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					>
					Registrar
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
							Já tem uma conta? Faça login!
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}