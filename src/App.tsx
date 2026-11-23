import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from "./components/PublicHome";

function App() {
  useEffect(() => {
    // Al cargar un enlace directo, la sección no existe hasta que React monta la página.
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
