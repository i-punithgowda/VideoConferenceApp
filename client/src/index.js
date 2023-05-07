import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./features/store/store";
import NoInternetConnection from "./features/NoInternetConnection";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientID = process.env.REACT_APP_CLIENTID;
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NoInternetConnection>
        <GoogleOAuthProvider clientId={clientID}>
          <App />
        </GoogleOAuthProvider>
      </NoInternetConnection>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
