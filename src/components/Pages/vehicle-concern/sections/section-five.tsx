import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface SectionFiveRef {
  validate: () => boolean;
}

const SectionFive = forwardRef<SectionFiveRef>((_, ref) => {
  const [selected, setSelected] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    validate() {
      if (!selected) {
        setError("Please select an option");
        return false;
      }
      setError("");
      return true;
    },
  }));

  const options = [
    "Parked > 10 days",
    "Trailer",
    "No Parking zone",
    "Fire hydrant",
    "Blocking sidewalk",
    "Disabled parking",
    "Bike lane",
  ];

  return (
    <div className="container mt-3">
      <h5 className="fw-bold">Select issue *</h5>

      {options.map((opt, i) => (
        <div key={i} className="form-check">
          <input
            type="radio"
            onChange={() => setSelected(opt)}
          />
          <label>{opt}</label>
        </div>
      ))}

      <textarea
        className="form-control mt-3"
        placeholder="Additional info"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
});

export default SectionFive;