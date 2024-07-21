import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { RouteUrls } from "../../../RouteUrls";

export type GoogleLoginFormOutput = {
  email: string;
  firstName: string;
  lastName: string;
  clientId: string;
  token: string;
};

interface GoogleJwtPayloaf extends JwtPayload {
  email: string;
  name: string;
  family_name: string;
  given_name: string;
}

export const GoogleAuthButton: React.FC = () => {
  const { googleAuth } = useAuthContext();
  const navigate = useNavigate();

  const onGoogleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const decodedToken = jwtDecode<GoogleJwtPayloaf>(response.credential!);
      const { email, name, family_name, given_name } = decodedToken;
      const googleData: GoogleLoginFormOutput = {
        email,
        firstName: given_name ?? name,
        lastName: family_name,
        clientId: response.clientId!,
        token: response.credential!,
      };
      await googleAuth(googleData);
      navigate(RouteUrls.HOME);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to login with Google");
      }
    }
  };

  const onGoogleLoginError = () => {
    toast.error("Failed to login with Google");
  };

  return (
    <GoogleLogin
      useOneTap
      onSuccess={onGoogleLoginSuccess}
      onError={onGoogleLoginError}
      text="continue_with"
    />
  );
};
