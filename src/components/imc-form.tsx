import ImcCalculator from "./imc-calculator";
import ImcHistory from "./imc-history";
import "../index.css";
import { useState } from "react";

function ImcForm() {
  const [recargaTrigger, setRecargaTrigger] = useState(0);

  return (
    <div className="container-flex">
      <ImcCalculator onCalculoExitoso={() => setRecargaTrigger(t => t + 1)} />
      <ImcHistory recargaTrigger={recargaTrigger} />
    </div>
  );
}

export default ImcForm;