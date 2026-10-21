import ReactDOM from "react-dom/client";
import { App } from "./App";

const root = ReactDOM.createRoot(
    // Confirma ao TypeScript que o valor não é null.
    document.getElementById("root")!
);

root.render(<App />);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((reg) => console.log('Service Worker registrado com sucesso!', reg))
//       .then((err) => console.log('Falha ao registrar Service Worker:', err));
//   });
// }
