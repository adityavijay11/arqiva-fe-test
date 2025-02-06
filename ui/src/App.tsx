import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import theme from "./themes";
import Layout from "./layout";
import Dashboard from "./pages/Dashboard";
import ErrorFallback from "./ErrorFallback";

function App() {
  function logErrorToService(error: Error) {
    console.error("Caught an error:", error);
  }
  const DashboardContainer = (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logErrorToService}
    >
      <Dashboard />
    </ErrorBoundary>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={DashboardContainer} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
