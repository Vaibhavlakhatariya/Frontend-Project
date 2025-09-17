import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Elements/Gallery";
import Blockquotes from "./pages/Elements/blockquotes";
import PricingPlans from "./pages/Elements/PricingPlans";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/elements">
          {/* Basic elements */}
         <Route path="basic-elements/gallery" element={<Gallery />} />
          <Route path="basic-elements/blockquotes" element={<Blockquotes/>}/>
          <Route path="infographic-elements/pricing-Plans" element={<PricingPlans/>}/>
          
        </Route>

        {/* <Route path="/contact-us" element={<ContactUs />} /> */}
      </Routes>
    </div>
  );
};

export default App;
