import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact-us" element={<ContactUs />} /> */}
      </Routes>
    </div>
  );
};

export default App;
