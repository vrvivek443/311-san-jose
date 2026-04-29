import React from "react";

const SectionSix = () => {
  return (
    <div className="container mt-4 mb-4 text-center">
      <div className="p-4 border rounded bg-light">
        {/* Success Icon */}
        <div className="mb-3">
          <div className="submitForm">✓</div>
        </div>

        {/* Title */}
        <h5 className="fw-bold mb-3">
          Thank you for submitting this Vehicle Concerns Report
        </h5>

        {/* Content */}
        <div className="text-start mx-auto maxWidth">
          <p>
            Your service report # is{" "}
            <span className="text-primary fw-semibold">
              SJ311PSR20260427-0196
            </span>
          </p>

          <p>
            The City of San José does not currently have an on-demand service
            for responding to illegally parked vehicle reports.
          </p>

          <p>
            You will not receive any additional communication from the City of
            San José.
          </p>

          <p>
            Your report will be used to guide proactive patrols (every 14 days)
            aimed at enforcing illegal parking on every City street.
          </p>

          <p>
            If during investigation, our teams identify additional vehicle
            issues that necessitate the involvement of multiple departments, the
            resolution of your report will take additional time.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4">
          <button className="btn btn-info text-white w-100 mb-2">
            Report another vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionSix;
