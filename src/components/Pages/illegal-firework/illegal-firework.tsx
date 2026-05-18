import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";
import SectionOne from "./sections/sections-one";
import type { SectionOneData } from "./sections/sections-one";
import SectionTwo from "./sections/sections-two";

const TOTAL_STEPS = 3;

const IllegalFirework = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [sectionOneData, setSectionOneData] = useState<SectionOneData>({
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    address: "",
    additionalInfo: "",
    position: { lat: 37.3382, lng: -121.8863 },
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowFeedbackModal(true);
      setShowSuccess(true);
    }, 1000);
  };

  if (showSuccess) {
    return (
      <>
        <h4 className="fw-bold mb-4">Thank you for your report, Vivek Vr!</h4>

        <AlertNavigation
          description={[
            "Your reference ID# is 260507-000018.",
            "We'll also email you a confirmation.",
            "The RAPID (Removing and Preventing Illegal Dumping) team will respond to reports of illegal dumping within 5 business days.",
          ]}
          primaryText="Track my report"
          onPrimary={() => navigate("/track-report")}
          secondaryText="Return home"
          onSecondary={() => navigate("/")}
        />
      </>
    );
  }

  return (
    <>
      <Modal
        show={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      >
        <div className="text-start">
          <h5 className="fw-bold mb-3">Please share your Feedback</h5>

          <p className="fw-semibold">
            How would you rate your overall experience using San Jose 311 to
            enter a service request?
            <span className="text-danger">*</span>
          </p>

          {["Very Good", "Good", "Neutral", "Bad", "Very Bad"].map((item) => (
            <div className="form-check" key={item}>
              <input type="radio" className="form-check-input" name="rating" />
              <label className="form-check-label">{item}</label>
            </div>
          ))}

          <p className="fw-semibold mt-3">
            How did you hear about San Jose 311?
            <span className="text-danger">*</span>
          </p>

          {[
            "I am an active San Jose 311 user",
            "City of San Jose",
            "Social Media",
            "Flyers/Posters",
            "Events",
            "Friend/Family",
            "Radio",
            "Newspaper/Newsletter",
            "Other",
          ].map((item) => (
            <div className="form-check" key={item}>
              <input type="radio" className="form-check-input" name="source" />
              <label className="form-check-label">{item}</label>
            </div>
          ))}

          <div className="text-end mt-3">
            <button
              className="btn btn-info text-white"
              onClick={() => setShowFeedbackModal(false)}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>

      <div className="container mt-3 mb-4">
        {/* Stepper */}
        <div className="d-flex justify-content-center align-items-center mb-4 mt-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = i + 1;
            const isActive = step >= stepNum;
            return (
              <React.Fragment key={stepNum}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: isActive ? "#198bb3" : "#fff",
                    border: `2px solid ${isActive ? "#198bb3" : "#d9d9d9"}`,
                  }}
                />
                {stepNum < TOTAL_STEPS && (
                  <div
                    style={{
                      width: "90px",
                      height: "2px",
                      background: step > stepNum ? "#198bb3" : "#d9d9d9",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Header */}
        <h4 className="fw-bold mb-4">My Illegal Fireworks Report</h4>

        {step === 1 && (
          <SectionOne
            data={sectionOneData}
            onChange={setSectionOneData}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <SectionTwo
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <div>
            <p className="text-muted">Section Three — coming soon.</p>
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-outline-secondary w-50"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button className="next-btn w-50" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}

        {isSubmitting && (
          <div className="loader-overlay">
            <div className="loader-box">
              <div className="spinner"></div>
              <p>Submitting your report...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IllegalFirework;
