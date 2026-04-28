import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface SectionFourRef {
  validate: () => boolean;
}

const SectionFour = forwardRef<SectionFourRef>((_, ref) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    validate() {
      if (!selected) {
        setError("Please select a concern");
        return false;
      }
      setError("");
      return true;
    },
  }));

  const options = [
    "Lived-in vehicle",
    "Trash/sewage around vehicle",
    "Vehicle in park/creek",
    "Vehicle on private property",
    "Poor vehicle condition",
    "Parking violation",
    "Criminal activity",
  ];

  return (
    <div className="container mt-3">
      <h5 className="fw-bold">Select concern *</h5>

      {options.map((opt, i) => (
        <div key={i} className="form-check">
          <input
            type="radio"
            className="form-check-input"
            onChange={() => setSelected(opt)}
          />
          <label className="form-check-label">{opt}</label>
        </div>
      ))}

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
});

export default SectionFour;