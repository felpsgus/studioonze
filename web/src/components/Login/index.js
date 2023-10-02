import * as React from 'react';
import {Button, Box, Container, Grid, TextField, Typography, Link, Alert, AlertTitle} from '@mui/material';
import axios from "axios";
import localforage from "localforage";

export default function Login() {

	const [formData, setFormData] = React.useState({
		user: '',
		password: ''
	});

	const handleChange = (event) => {

		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	}

	const [errors, setErrors] = React.useState([]);
	const errorsList = (errors) => {
		let errorsAux = Object.keys(errors).map((key) => {
			return errors[key];
		})
		setErrors(errorsAux);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await axios.post('http://localhost:8000/api/v1/login/', {
			password: formData.password,
			user: formData.user
		}).then((response) => {
			console.log(response);
			localforage.setItem('token', response.data);
			window.location.href = '/';
		}).catch((error) => {
			if(error.response.status === 401){
				errorsList(['Usuário ou senha inválidos']);
			}
		});

		return response;

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
					Login
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
							autoComplete="given-name"
							name="user"
							required
							fullWidth
							id="user"
							label="Usuário"
							autoFocus
							onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
							required
							fullWidth
							name="password"
							label="Senha"
							type="password"
							id="password"
							onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					>
					Login
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/registrar" variant="body2">
							Não possui uma conta? Faça seu cadastro!
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}