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
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import "./vehicle-concerns.css";

const VehicleConcern: React.FC = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState<null | "LIV" | "CRI">(null);
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
    images: [] as File[],
    noPhoto: false,
  });
  const [sectionFiveData, setSectionFiveData] = useState({
    selected: [],
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
    if (currentStep === 6) return;
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

    if (currentStep === 4) {
      if (sectionFourData === "LIV" || sectionFourData === "CRI") {
        setShowAlert(sectionFourData);
        return;
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/");
    }
  };

  const renderStepForm = () => {
    if (showAlert === "LIV") {
      return (
        <div className="vehicle-container">
          <AlertNavigation
            description={[
              "Thank you for taking the time to share your concern. At this time, the City of San José is unable to directly respond to individual reports of lived-in vehicles.",
              "However, the information you are providing is valuable and will help the City better understand where lived-in vehicles are located.",
              "This service request will be automatically closed.",
              "For more information regarding the City’s current efforts please visit:",
            ]}
            links={[
              { label: "Oversized/Lived-in Vehicles (OLIVE) Program" },
              { label: "RV Pollution Prevention Program (RVP3)" },
              { label: "Homelessness Response" },
            ]}
            primaryText="I understand, continue"
            secondaryText="Go Back"
            onPrimary={() => {
              setShowAlert(null);
              setCurrentStep(5);
            }}
            onSecondary={() => {
              setShowAlert(null);
            }}
          />
        </div>
      );
    }

    if (showAlert === "CRI") {
      return (
        <div className="vehicle-container">
          <AlertNavigation
            description={[
              "If you are witnessing criminal activity in progress or a vehicle is creating a hazard that is a risk to life or major property damage, call 911.",
              "If you suspect that a vehicle may be involved in illegal activities e.g. drugs or prostitution, please continue to report here.",
              "Currently we do not have an on-demand service for these reports.",
              "However, the information you provide will be sent to the appropriate police units.",
              "Once sent your request will be closed on SJ311.",
            ]}
            primaryText="I understand, continue"
            secondaryText="Go Back"
            onPrimary={() => {
              setShowAlert(null);
              setCurrentStep(5);
            }}
            onSecondary={() => {
              setShowAlert(null);
            }}
          />
        </div>
      );
    }
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
              style={{
                cursor: currentStep === 6 ? "not-allowed" : "pointer",
                opacity: currentStep === 6 ? 0.6 : 1,
              }} // Making the step clickable
            >
              {step}
            </div>
            {step !== 6 && <div className="line"></div>}
          </div>
        ))}
      </div>

      {/* Step Form */}
      {renderStepForm()}

      {!showAlert && (
        <button className="next-btn" onClick={handleNext}>
          {currentStep === 6
            ? "Go Home"
            : currentStep === 5
              ? "Submit"
              : "Next"}
        </button>
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
  );
};

export default VehicleConcern;
