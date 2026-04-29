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
        setError("Please select at least one option");
        return false;
      }
      setError("");
      return true;
    },
  }));

  const options = [
    "Vehicle is parked without moving for 10 or more consecutive days.",
    "Unattached trailer e.g. 5th wheel, boat, utility trailer",
    "No Parking/ No Parking Certain Times/ Time Limit",
    "Fire Hydrant/ Fire Lane",
    "Blocking sidewalk, access ramp, crosswalk, bus lane, traffic",
    "Disabled parking",
    "Freight/ passenger loading zone",
    "Bike lane",
    "Permit parking",
    "Paid/ metered parking",
  ];

  return (
    <div className="container mt-3 mb-4">
      {/* Title */}
      <h5 className="fw-bold">
        Please select at least one option that describes the vehicle
        (parked on a city street) you are reporting:
        <span className="text-danger"> *</span>
      </h5>

      <p className="text-muted">
        Choose one option that best describes the issue.
      </p>

      {/* Options List */}
      <div className="list-group mb-3">
        {options.map((option, index) => (
          <label
            key={index}
            className="list-group-item list-group-item-action d-flex gap-2 align-items-start"
            style={{ cursor: "pointer" }}
          >
            <input
              className="form-check-input mt-1"
              type="radio"
              name="case5Option"
              value={option}
              checked={selected === option}
              onChange={() => setSelected(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* Error */}
      {error && <p className="text-danger">{error}</p>}

      {/* Additional Info */}
      <div className="mb-3">
        <label className="fw-semibold mb-2">
          Additional Information - If any
        </label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Type in Text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
});

export default SectionFive;