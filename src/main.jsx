import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="687580195618-pd7kq8eu9tp5333rq8p347d7c1dducgt.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
