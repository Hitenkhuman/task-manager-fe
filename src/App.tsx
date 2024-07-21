import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/navbar/Navbar";
import { Login } from "./pages/auth/login/Login";
import { Signup } from "./pages/auth/signup/Signup";
import { RouteUrls } from "./RouteUrls";
import { HomePage } from "./pages/home/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./components/RestrictedRoutes/PrivateRoute";
import AuthRoute from "./components/RestrictedRoutes/AuthRoute";
import { AuthProvider } from "./providers/AuthProvider";
import { Logout } from "./pages/auth/logout/Logout";
import { ToastContainer, toast } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/errors/ErrorPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <ErrorBoundary key="root" fallbackRender={ErrorFallback}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route
                path={RouteUrls.HOME}
                element={<PrivateRoute element={<HomePage />} />}
              />
              <Route
                path={RouteUrls.LOGIN}
                element={<AuthRoute element={<Login />} />}
              />
              <Route
                path={RouteUrls.SIGNUP}
                element={<AuthRoute element={<Signup />} />}
              />
              <Route path={RouteUrls.LOGOUT} element={<Logout />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
