import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CountdownContextProvider } from "./Context/CountdownContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CountdownContextProvider>
      <App />
    </CountdownContextProvider>
  </React.StrictMode>
);
