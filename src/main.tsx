import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="h-screen flex flex-col bg-black">
      <header>
        <nav className="sm:flex space-x-6 py-3 px-5 sm:text-center text-white">
          <h5 className="">Home</h5>
          <h5 className="">About</h5>
          <h5 className="">Services</h5>
          <h5 className="">Contact</h5>
        </nav>
      </header>
      <main className="flex-1 overflow-auto max-w bg-gray-300">
        <div className="max-w-10/12 mx-auto h-screen">
          <App />
        </div>
      </main>
      <footer>
        <div className="w-full flex text-center bg-black text-white justify-center py-3 px-5">
          <p>© 2025 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </StrictMode>
);
