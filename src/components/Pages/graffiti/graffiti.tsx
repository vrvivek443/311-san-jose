import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const Graffiti = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    address: "",
    additionalInfo: "",
    graffitiOn: "",
    isPublic: "",
    isOffensive: "",
    position: { lat: 37.3382, lng: -121.8863 }, // San Jose default
  });

  const [errors, setErrors] = useState<any>({});

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

    if (!data.address) newErrors.address = "Address is required";
    if (!data.graffitiOn) newErrors.graffitiOn = "Please select an option";
    if (!data.additionalInfo) newErrors.additionalInfo = "This field is required";
    if (!data.isOffensive) newErrors.isOffensive = "Please select an option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log("Graffiti Data:", data);
    alert("Submitted!");
    navigate("/");
  };

  return (
    <div className="container mt-3 mb-4">
      {/* Header */}
      <h4 className="fw-bold mb-4">Your Graffiti Report</h4>
      <p className="text-muted">
        Report graffiti on buildings, sidewalks, roads and structures.
      </p>

      {/* Address Section */}
      <div className="mb-3">
        <label className="fw-bold">
          Where is it? <span className="text-danger">*</span>
        </label>

        <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
          (Only valid city locations are accepted)
        </p>

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

        {errors.address && (
          <p className="text-danger">{errors.address}</p>
        )}

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

      {/* Graffiti On */}
      <div className="mb-3">
        <label className="fw-bold">
          What is it on? <span className="text-danger">*</span>
        </label>

        <select
          className="form-control"
          value={data.graffitiOn}
          onChange={(e) => {
            setData({ ...data, graffitiOn: e.target.value });
            setErrors((prev: any) => ({
              ...prev,
              graffitiOn: "",
            }));
          }}
        >
          <option value="">Select</option>
          <option>Building</option>
          <option>Sidewalk</option>
          <option>Road</option>
          <option>Other</option>
        </select>

        {errors.graffitiOn && (
          <p className="text-danger">{errors.graffitiOn}</p>
        )}
      </div>

      {/* Public Property */}
      <div className="mb-3">
        <label className="fw-bold">Is it on public property?</label>

        <div className="mt-2">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="public"
              checked={data.isPublic === "yes"}
              onChange={() =>
                setData({ ...data, isPublic: "yes" })
              }
            />
            <label className="form-check-label">Yes</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="public"
              checked={data.isPublic === "no"}
              onChange={() =>
                setData({ ...data, isPublic: "no" })
              }
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
      </div>

      {/* Offensive */}
      <div className="mb-3">
        <label className="fw-bold">Is it offensive?</label>

        <div className="mt-2">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="offensive"
              checked={data.isOffensive === "yes"}
              onChange={() =>
                setData({ ...data, isOffensive: "yes" })
              }
            />
            <label className="form-check-label">Yes</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="offensive"
              checked={data.isOffensive === "no"}
              onChange={() =>
                setData({ ...data, isOffensive: "no" })
              }
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mb-3">
        <label className="fw-semibold">Tell us more<span className="text-danger">*</span></label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Add details here"
          value={data.additionalInfo}
          onChange={(e) => {
            setData({ ...data, additionalInfo: e.target.value });
            setErrors((prev: any) => ({
              ...prev,
              additionalInfo: "",
            }));
          }}
        />
        {errors.additionalInfo && (
          <p className="text-danger">{errors.additionalInfo}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="fw-bold">
          Where is it? <span className="text-danger">*</span>
        </label>
        <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
          (Only valid city locations are accepted)
        </p>

        <div className="mt-2">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="offensive"
              checked={data.isOffensive === "yes"}
              onChange={() =>
                setData({ ...data, isOffensive: "yes" })
              }
            />
            <label className="form-check-label">Yes</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="offensive"
              checked={data.isOffensive === "no"}
              onChange={() =>
                setData({ ...data, isOffensive: "no" })
              }
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
        {errors.isOffensive && (
          <p className="text-danger">{errors.isOffensive}</p>
        )}
      </div>

      {/* Submit */}
      <button className="next-btn w-100" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Graffiti;