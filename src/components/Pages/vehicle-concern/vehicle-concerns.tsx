import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import type { ChangeEvent as ReactChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./vehicle-concerns.css";

const VehicleConcern: React.FC = () => {
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [position, setPosition] = useState({
    lat: 37.3382, // Default: San Jose
    lng: -121.8863,
  });

  const [address, setAddress] = useState("");

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const handleDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setPosition({ lat, lng });

    console.log("Selected Location:", lat, lng);

    // Optional: Reverse geocode here
  };

  // Step 1: License Plate Input
  const handleInputChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    setLicensePlate(e.target.value);
  };

  const navigate = useNavigate();

  // Step 2: Radio Buttons selection
  const handleRadioChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  // Step 3: File Upload (Image)
  const handleFileChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Move to next step
  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/");
      // Handle form submission or complete the flow
    }
  };

  // Navigate directly to the clicked step (only if it's previous step or same step)
  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step); // Only allow navigating to a previous step
    }
  };

  // Render different forms based on the current step
  // Step 1: License Plate Input
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <p className="instruction">
              Click the camera icon below to scan or upload a photo of the
              vehicle license plate: <span className="required">*</span>
            </p>
            <div className="camera-box">
              <input
                type="file"
                accept="image/*"
                id="upload"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="upload" className="camera-icon">
                📷
              </label>
            </div>
            <p className="sub-text">
              Or type in the license plate number. Do not include special
              characters
            </p>
            <input
              type="text"
              className="input-box"
              placeholder="Enter a license plate number"
              value={licensePlate}
              onChange={handleInputChange}
            />

            <div>
              <p className="instruction">
                Select the reason for the vehicle concern
              </p>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="vehicleOption"
                    value="no-plates"
                    checked={selectedOption === "no-plates"}
                    onChange={handleRadioChange}
                  />
                  Vehicle does not have front and back license plates
                </label>
                <label>
                  <input
                    type="radio"
                    name="vehicleOption"
                    value="covered"
                    checked={selectedOption === "covered"}
                    onChange={handleRadioChange}
                  />
                  License plate is covered
                </label>
                <label>
                  <input
                    type="radio"
                    name="vehicleOption"
                    value="dont-have"
                    checked={selectedOption === "dont-have"}
                    onChange={handleRadioChange}
                  />
                  I don't have the license plate number
                </label>
              </div>
            </div>

            {/* Dropdowns for Vehicle Information */}
            <div className="dropdowns">
              <div className="mb-3">
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                  id="vehicleType"
                  className="form-select"
                  onChange={(e) => setSelectedOption(e.target.value)} // Handle the dropdown value change
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bus">Bus</option>
                  <option value="van">Van</option>
                </select>
              </div>

              <div className="dropdown">
                <label htmlFor="vehicleColor">Vehicle Color</label>
                <select
                  id="vehicleColor"
                  className="form-select"
                  onChange={(e) => setSelectedOption(e.target.value)} // Handle the dropdown value change
                >
                  <option value="">Select Vehicle Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="gray">Gray</option>
                  <option value="green">Green</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="vehicleMake">Vehicle Make</label>
                <select
                  id="vehicleMake"
                  className="form-select"
                  onChange={(e) => setSelectedOption(e.target.value)} // Handle the dropdown value change
                >
                  <option value="">Select Vehicle Make</option>
                  <option value="toyota">Toyota</option>
                  <option value="ford">Ford</option>
                  <option value="honda">Honda</option>
                  <option value="bmw">BMW</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="mercedes">Mercedes</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="vehicleModel">Vehicle Model</label>
                <select
                  id="vehicleModel"
                  className="form-select"
                  onChange={(e) => setSelectedOption(e.target.value)} // Handle the dropdown value change
                >
                  <option value="">Select Vehicle Model</option>
                  <option value="sedan">Sedan</option>
                  <option value="coupe">Coupe</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="convertible">Convertible</option>
                  <option value="pickup">Pickup</option>
                  <option value="suv">SUV</option>
                </select>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="container mt-4">
              <label className="form-label fw-bold">
                Upload/take vehicle photo
              </label>
              <p className="text-muted mb-3">
                Photo should show the vehicle condition being reported
              </p>

              {/* Upload box */}
              <div className="d-flex justify-content-center align-items-center border border-dashed border-2 p-4 mb-2 case-2-vc">
                <label htmlFor="file-upload" className="m-0">
                  <span>Add photo</span>
                </label>

                {/* Hidden file input */}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      alert(`Selected file: ${file.name}`);
                    }
                  }}
                />
              </div>

              {/* Max file size info */}
              <p className="text-muted small mb-3">Max 10 MB attachments</p>

              {/* "I don't have a photo" radio option */}
              <div>
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="photoOption"
                    className="form-check-input"
                  />
                  I don't have a photo
                </label>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="container mt-3 mb-4">
              {/* Question */}
              <div className="mb-3">
                <label className="fw-bold">
                  Is the vehicle on a City Street?{" "}
                  <span className="text-danger">*</span>
                </label>

                <div className="mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cityStreet"
                      id="yes"
                    />
                    <label className="form-check-label" htmlFor="yes">
                      Yes
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cityStreet"
                      id="no"
                    />
                    <label className="form-check-label" htmlFor="no">
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="mb-3">
                <label className="fw-bold">
                  Where is it? <span className="text-danger">*</span>
                </label>

                <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
                  (Only San Jose addresses are enforceable)
                </p>

                <ul style={{ fontSize: "13px" }}>
                  <li>Type in the full address and click search</li>
                  <li>or</li>
                  <li>
                    Drag the red pin on the map below to select the location and
                    then click search
                  </li>
                </ul>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter address"
                />

                <button className="next-btn mb-3 search-btn">
                  <span>Search (required)</span>
                  <span className="icon">🔍</span>
                </button>
              </div>

              {/* Map (Image Placeholder) */}
              <div className="mb-3">
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={13}
                  >
                    <Marker
                      position={position}
                      draggable={true}
                      onDragEnd={handleDragEnd}
                    />
                  </GoogleMap>
                </LoadScript>
              </div>

              {/* Additional Info */}
              <div>
                <label className="fw-semibold">Tell us more</label>
                <p className="text-muted" style={{ fontSize: "13px" }}>
                  e.g. nearest intersection
                </p>

                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Add details here"
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <div className="container mt-3 mb-4">
            <h5 className="fw-bold">
              What vehicle concern are you reporting?{" "}
              <span className="text-danger">*</span>
            </h5>

            <p className="text-muted">
              Choose one option that best describes the vehicle concern you are
              reporting.
            </p>

            <div className="list-group">
              {[
                "Lived-in vehicle",
                "Trash/sewage around a vehicle (not inside the vehicle or on the truck bed)",
                "Vehicle in a park, creek or trail",
                "Vehicle on private property",
                "Poor condition of a vehicle parked on a city street",
                "Issue with how, where or how long a vehicle is parked on a city street",
                "Suspected vehicle-related criminal activity (drugs or prostitution)",
              ].map((option, index) => (
                <label
                  key={index}
                  className="list-group-item list-group-item-action d-flex gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="vehicleConcern"
                    value={option}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="container mt-3 mb-4">
            <h5 className="fw-bold">
              Please select at least one option that describes the vehicle
              (parked on a city street) you are reporting:
              <span className="text-danger">*</span>
            </h5>

            <p className="text-muted">
              Choose one option that best describes the issue.
            </p>

            <div className="list-group mb-3">
              {[
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
              ].map((option, index) => (
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
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <div className="mb-3">
              <label className="fw-semibold mb-2">
                Additional Information - If any
              </label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Type in Text"
              />
            </div>
          </div>
        );
      case 6:
        return (
          <>
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
                    The City of San José does not currently have an on-demand
                    service for responding to illegally parked vehicle reports.
                  </p>

                  <p>
                    You will not receive any additional communication from the
                    City of San José.
                  </p>

                  <p>
                    Your report will be used to guide proactive patrols (every
                    14 days) aimed at enforcing illegal parking on every City
                    street.
                  </p>

                  <p>
                    If during investigation, our teams identify additional
                    vehicle issues that necessitate the involvement of multiple
                    departments, the resolution of your report will take
                    additional time.
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
          </>
        );
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
        {currentStep === 6 ? "Go Home" : "Next"}
      </button>
    </div>
  );
};

export default VehicleConcern;
