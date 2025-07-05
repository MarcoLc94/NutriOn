import Inicio from "./pages/inicio/Inicio";
import Layout from "./pages/layout/Layout";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
