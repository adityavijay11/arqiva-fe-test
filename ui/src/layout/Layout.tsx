import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import useStyles from "./styles";

export default function Layout() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <main>
          <CssBaseline />
          <Outlet />
        </main>
      </Container>
    </div>
  );
}
