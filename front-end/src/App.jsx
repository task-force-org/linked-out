import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginCom from "./components/LoginCom";
import LoginIndiv from "./components/LoginIndiv";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/individual" element={<LoginIndiv />} />
        <Route path="/company" element={<LoginCom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
