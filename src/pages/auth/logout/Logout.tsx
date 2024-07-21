import React, { useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { RouteUrls } from "../../../RouteUrls";

export const Logout: React.FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    logout();
    queryClient.removeQueries();
    navigate(RouteUrls.LOGIN);
  }, []);

  return <></>;
};
