import React, { useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import type { ChangeEvent as ReactChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import SectionOne from "./sections/section-one";
import SectionTwo from "./sections/section-two";
import SectionThree from "./sections/section-three";
import SectionFive from "./sections/section-five";
import SectionFour from "./sections/section-four";
import SectionSix from "./sections/section-six";
import type { SectionOneRef } from "./sections/section-one";
import type { SectionTwoRef } from "./sections/section-two";
import type { SectionThreeRef } from "./sections/section-three";
import type { SectionFourRef, SectionFourCode } from "./sections/section-four";
import type { SectionFiveRef } from "./sections/section-five";
import "./vehicle-concerns.css";

const VehicleConcern: React.FC = () => {
  const navigate = useNavigate();
  const sectionOneRef = useRef<SectionOneRef>(null);
  const sectionTwoRef = useRef<SectionTwoRef>(null);
  const sectionThreeRef = useRef<SectionThreeRef>(null);
  const sectionFourRef = useRef<SectionFourRef>(null);
  const sectionFiveRef = useRef<SectionFiveRef>(null);
  const [sectionOneData, setSectionOneData] = useState({
    licensePlate: "",
    vehicleOption: "",
    vehicleType: "",
    vehicleColor: "",
    vehicleMake: "",
    vehicleModel: "",
  });
  const [sectionTwoData, setSectionTwoData] = useState({
    image: null as File | null,
    noPhoto: false,
  });
  const [sectionFiveData, setSectionFiveData] = useState({
    selected: "",
    notes: "",
  });
  const [sectionThreeData, setSectionThreeData] = useState({
    cityStreet: "",
    address: "",
    additionalInfo: "",
    position: {
      lat: 37.3382,
      lng: -121.8863,
    },
  });
  const [sectionFourData, setSectionFourData] = useState<SectionFourCode | "">(
    "",
  );

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const stepValidationMap: Record<number, () => boolean | undefined> = {
    1: () => sectionOneRef.current?.validate(),
    2: () => sectionTwoRef.current?.validate(),
    3: () => sectionThreeRef.current?.validate(),
    4: () => sectionFourRef.current?.validate(),
    5: () => sectionFiveRef.current?.validate(),
    6: () => true, // final step usually no validation
  };

  // ✅ Next button
  const handleNext = () => {
    const validateCurrentStep = stepValidationMap[currentStep];

    if (validateCurrentStep) {
      const isValid = validateCurrentStep();
      if (!isValid) return;
    }

    if (currentStep === 5) {
      const finalData = {
        sectionOneData,
        sectionTwoData,
        sectionThreeData,
        sectionFourData,
        sectionFiveData,
      };

      console.log("Final Submitted Data:", finalData);

      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setCurrentStep(6); // move after loader
      }, 5000);

      return;
    }

    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/");
    }
  };

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <SectionOne
            ref={sectionOneRef}
            data={sectionOneData}
            onChange={setSectionOneData}
          />
        );
      case 2:
        return (
          <SectionTwo
            ref={sectionTwoRef}
            data={sectionTwoData}
            onChange={setSectionTwoData}
          />
        );
      case 3:
        return (
          <SectionThree
            ref={sectionThreeRef}
            data={sectionThreeData}
            onChange={setSectionThreeData}
          />
        );
      case 4:
        return (
          <SectionFour
            ref={sectionFourRef}
            data={sectionFourData}
            onChange={setSectionFourData}
          />
        );
      case 5:
        return (
          <SectionFive
            ref={sectionFiveRef}
            section4Value={sectionFourData}
            data={sectionFiveData}
            onChange={setSectionFiveData}
          />
        );
      case 6:
        return <SectionSix />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="vehicle-container">
      <h2 className="title">Your Vehicle Concerns Report</h2>

      {/* Progress Steps */}
      <div className="steps">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} className="step-wrapper">
            <div
              className={`step ${currentStep >= step ? "active" : ""}`}
              onClick={() => handleStepClick(step)} // Step click handler
              style={{ cursor: "pointer" }} // Making the step clickable
            >
              {step}
            </div>
            {step !== 6 && <div className="line"></div>}
          </div>
        ))}
      </div>

      {/* Step Form */}
      {renderStepForm()}

      {/* Next Button */}
      <button className="next-btn" onClick={handleNext}>
        {currentStep === 6 ? "Go Home" : currentStep === 5 ? "Submit" : "Next"}
      </button>

      {isSubmitting && (
        <div className="loader-overlay">
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Submitting your report...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleConcern;
