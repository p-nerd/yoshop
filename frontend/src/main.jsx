import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/bootstrap.css";
import "./styles/index.css";
import App from "./App.jsx";
import store from "./app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
