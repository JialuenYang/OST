import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const theme = createTheme({
	components: {
		MuiPopover: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiPopper: {
			defaultProps: {
				container: rootElement,
			},
		},
	},
});

root.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</StyledEngineProvider>
	</React.StrictMode>
);
