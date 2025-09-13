import ImcCalculator from "./imc-calculator";
import ImcHistory from "./imc-history";
import "../index.css";

function ImcForm() {
  return (
    <div className="container-flex">
      <ImcCalculator />
      <ImcHistory />
    </div>
  );
}

export default ImcForm;