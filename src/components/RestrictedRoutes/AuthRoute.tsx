import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouteUrls } from "../../RouteUrls";

interface AuthRouteProps {
  element: React.ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(RouteUrls.HOME);
    }
  }, [currentUser, navigate]);

  return currentUser ? null : element;
};

export default AuthRoute;
