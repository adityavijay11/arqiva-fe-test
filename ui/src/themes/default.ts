import { createTheme } from "@mui/material/styles";
import typography from "./typography";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      default: "#121212",
      paper: "#424242",
    },
    primary: {
      light: "#333",
      main: "#90caf9",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#90caf9",
      dark: "#c51162",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
  typography: { ...typography },
});

export default defaultTheme;
