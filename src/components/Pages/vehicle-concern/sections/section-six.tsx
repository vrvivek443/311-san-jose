import React from "react";

const SectionSix = () => {
  return (
    <div className="container mt-4 text-center">
      <div className="p-4 border rounded bg-light">
        <div className="mb-3">
          <div className="submitForm">✓</div>
        </div>

        <h5 className="fw-bold">
          Thank you for submitting the report
        </h5>

        <p>
          Your service report #{" "}
          <strong>SJ311PSR20260427-0196</strong>
        </p>

        <p>
          The City does not provide on-demand response for
          illegally parked vehicles.
        </p>

        <button className="btn btn-info text-white w-100">
          Report another vehicle
        </button>
      </div>
    </div>
  );
};

export default SectionSix;