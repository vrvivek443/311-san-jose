import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import Modal from "../../shared/modal/modal";

const IllegalFirework = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");

  const [data, setData] = useState({
    address: "",
    additionalInfo: "",
    graffitiOn: "",
    isPublic: "",
    isOffensive: "",
    isView: "no",
    position: { lat: 37.3382, lng: -121.8863 }, // San Jose default
  });

  const [errors, setErrors] = useState<any>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const handleDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setData({ ...data, position: { lat, lng } });
  };


  const validate = () => {
    let newErrors: any = {};
    let isValid = true;

    // Address validation
    if (!data.address) {
      newErrors.address =
        "Please provide a location and remember to hit Search";
      isValid = false;
    }

    // Public view validation
    if (!data.isView) {
      newErrors.isView = "Please select an option";
      isValid = false;
    }

    // Additional info validation
    if (!data.additionalInfo || data.additionalInfo.trim().length === 0) {
      newErrors.additionalInfo = "Please describe the issue";
      isValid = false;
    }


    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Graffiti Data:", data);

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

          {/* Question 1 */}
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

          {/* Question 2 */}
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

          {/* Submit Button */}
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
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#198bb3",
              border: "2px solid #198bb3",
            }}
          ></div>

          <div
            style={{
              width: "90px",
              height: "2px",
              background: "#d9d9d9",
            }}
          ></div>

          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #d9d9d9",
            }}
          ></div>

          <div
            style={{
              width: "90px",
              height: "2px",
              background: "#d9d9d9",
            }}
          ></div>

          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #d9d9d9",
            }}
          ></div>
        </div>
        {/* Header */}
        <h4 className="fw-bold mb-4">My Illegal Fireworks Report</h4>

        {/* Date */}
        <div className="mb-3">
          <label className="fw-bold">
            Date of fireworks incident
            <span className="text-danger">*</span>
          </label>

          <input
            type="date"
            className="form-control"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
          />
        </div>

        {/* Time */}
        <div className="mb-3">
          <label className="fw-bold">
            Time of fireworks incident
            <span className="text-danger">*</span>
          </label>

          <select
            className="form-control"
            value={incidentTime}
            onChange={(e) => setIncidentTime(e.target.value)}
          >
            <option value="">Select an option</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="fw-bold">
            Location of fireworks incident
            <span className="text-danger">*</span>
          </label>

          <select
            className="form-control"
            value={incidentLocation}
            onChange={(e) => setIncidentLocation(e.target.value)}
          >
            <option value="">Select an option</option>
            <option>Front Yard</option>
            <option>Back Yard</option>
            <option>Street</option>
            <option>Park</option>
            <option>Parking Lot</option>
            <option>Other</option>
          </select>
        </div>

        {/* Address Info */}
        <div className="mb-2"></div>

        {/* Address Section */}
        <div className="mb-3">
          <label className="fw-bold">
            Please provide the address where the use, sale, or possession of
            fireworks occurred (Only San José addresses are enforceable)
            <span className="text-danger">*</span>
          </label>

          <p className="text-danger mb-2" style={{ fontSize: "13px" }}>
            The address provided will be used for enforcement.
          </p>

          <ul style={{ fontSize: "14px" }}>
            <li>Type in the full address and click search</li>
            <li>
              or drag the red pin on the map below to select the location and
              then click search.
            </li>
          </ul>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter address"
            value={data.address}
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
              setErrors((prev: any) => ({ ...prev, address: "" }));
            }}
          />

          {errors.address && <p className="text-danger">{errors.address}</p>}

          <button className="next-btn mb-3 search-btn">
            Search (Optional) 🔍
          </button>
        </div>

        {/* Map */}
        <div className="mb-3">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={data.position}
              zoom={13}
            >
              <Marker
                position={data.position}
                draggable
                onDragEnd={handleDragEnd}
              />
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Additional Info */}
        <div className="mb-3">
          <label className="fw-semibold">
            Briefly describe the incident. (what you observed)
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Add details here"
            value={data.additionalInfo}
            onChange={(e) => {
              let value = e.target.value;

              // ✅ HARD LIMIT: stop at 4000 chars
              if (value.length > 4000) return;

              setData({ ...data, additionalInfo: value });

              if (value.trim().length === 0) {
                setErrors((prev: any) => ({
                  ...prev,
                  additionalInfo: "This field is required",
                }));
              } else {
                setErrors((prev: any) => ({
                  ...prev,
                  additionalInfo: "",
                }));
              }
            }}
          />
          <p
            className={`mt-1 ${
              data.additionalInfo.length === 4000 ? "text-danger" : "text-muted"
            } `}
            style={{ fontSize: "12px" }}
          >
            {data.additionalInfo.length}/4000 characters
          </p>

          {errors.additionalInfo && (
            <p className="text-danger mb-1">{errors.additionalInfo}</p>
          )}
        </div>

        <button className="next-btn w-100" onClick={handleSubmit}>
          Submit
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
    </>
  );
};

export default IllegalFirework;
