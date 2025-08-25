import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Displaypage from "./pages/DisplayPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Displaypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
