import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();
  return (
    <Container maxWidth="md">
      <Box role="alert">
        <Typography variant="h1" component="h2" sx={{ mb: 10 }}>
          Something went wrong:
        </Typography>
        <Alert variant="filled" severity="error">
          {error.toString()}
        </Alert>
        <Button
          variant="contained"
          sx={{ mt: 10, width: 200 }}
          onClick={resetBoundary}
        >
          Try Again
        </Button>
      </Box>
    </Container>
  );
}

export default ErrorFallback;
