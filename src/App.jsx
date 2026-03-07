import { Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import BusinessPage from "./pages/BusinessPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreatePage />} />
        <Route path="/page/:id" element={<BusinessPage />} />
      </Routes>
    </>
  );
}

export default App;
