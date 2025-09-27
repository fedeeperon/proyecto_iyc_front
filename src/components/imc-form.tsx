import ImcCalculator from "./imc-calculator";
import ImcHistory from "./imc-history";
import Navbar from "./navbar";
import "../index.css";
import { useState } from "react";

function ImcForm() {
  const [recargaTrigger, setRecargaTrigger] = useState(0);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="container-flex">
          <ImcCalculator onCalculoExitoso={() => setRecargaTrigger(t => t + 1)} />
          <ImcHistory recargaTrigger={recargaTrigger} />
        </div>
      </div>
    </>
  );
}

export default ImcForm;