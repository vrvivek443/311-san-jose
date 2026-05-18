import React from "react";

interface SectionTwoProps {
  onNext: () => void;
  onBack: () => void;
}

const SectionTwo: React.FC<SectionTwoProps> = ({ onNext, onBack }) => {
  return (
    <div>
      <p className="text-muted">Section Two — coming soon.</p>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-secondary w-50" onClick={onBack}>
          Back
        </button>
        <button className="next-btn w-50" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SectionTwo;
