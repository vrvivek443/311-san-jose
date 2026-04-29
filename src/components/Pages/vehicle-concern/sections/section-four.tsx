import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

export interface SectionFourRef {
  validate: () => boolean;
}

const SectionFour = forwardRef<SectionFourRef>((_, ref) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const options = [
    "Lived-in vehicle",
    "Trash/sewage around a vehicle (not inside the vehicle or on the truck bed)",
    "Vehicle in a park, creek or trail",
    "Vehicle on private property",
    "Poor condition of a vehicle parked on a city street",
    "Issue with how, where or how long a vehicle is parked on a city street",
    "Suspected vehicle-related criminal activity (drugs or prostitution)",
  ];

  // ✅ Expose validation
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

  return (
    <div className="container mt-3 mb-4">
      {/* Title */}
      <h5 className="fw-bold">
        What vehicle concern are you reporting?{" "}
        <span className="text-danger">*</span>
      </h5>

      {/* Description */}
      <p className="text-muted">
        Choose one option that best describes the vehicle concern you are
        reporting.
      </p>

      {/* Options */}
      <div className="list-group">
        {options.map((option, index) => (
          <label
            key={index}
            className={`list-group-item list-group-item-action d-flex gap-2 ${
              selected === option ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <input
              className="form-check-input mt-1"
              type="radio"
              name="vehicleConcern"
              value={option}
              checked={selected === option}
              onChange={() => setSelected(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* Error */}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
});

export default SectionFour;