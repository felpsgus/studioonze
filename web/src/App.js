import Login from "./components/Login";
import Registrar from "./components/Registrar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cadastrar from "./components/ModalCadastrar";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard/>} />
					<Route path="/registrar" element={<Registrar/>} />
					<Route path="/login" element={<Login />} />
					<Route path="/cadastrar" element={<Cadastrar />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
  );
}

export default App;
