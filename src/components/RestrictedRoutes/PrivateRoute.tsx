import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouteUrls } from "../../RouteUrls";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(RouteUrls.LOGIN);
    }
  }, [currentUser, navigate]);

  return currentUser ? element : null;
};

export default PrivateRoute;