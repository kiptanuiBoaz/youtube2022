import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContext as AuthContextProvider} from "./context/AuthContext"

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
     
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
