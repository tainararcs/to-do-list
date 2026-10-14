import ReactDOM from "react-dom/client";
import { App } from "./App";

const root = ReactDOM.createRoot(
    // Confirma ao TypeScript que o valor não é null.
    document.getElementById("root")!
);

root.render(<App />);