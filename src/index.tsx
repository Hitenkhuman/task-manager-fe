import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_KEY } from "./constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_KEY}>
    <App />
  </GoogleOAuthProvider>
);
