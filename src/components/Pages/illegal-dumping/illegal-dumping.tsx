import React,  { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import AlertNavigation from "../../shared/alert-navigation/alert-navigation";
import "./illegal-dumping.css";

const IllegalDumping = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    address: "",
    additionalInfo: "",
    graffitiOn: "",
    isPublic: "",
    isOffensive: "",
    whereIsIt: "",
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
  
      let selectedFiles = Array.from(files);
  
      let hasSizeError = false;
      let hasTypeError = false;
  
      const validFiles = selectedFiles.filter((file) => {
        if (!file.type.startsWith("image/")) {
          hasTypeError = true;
          return false;
        }
  
        if (file.size > 10 * 1024 * 1024) {
          hasSizeError = true;
          return false;
        }
  
        return true;
      });
  
      if (hasTypeError) {
        setImageError("Only image files are allowed (JPG, PNG, etc.)");
      } else if (hasSizeError) {
        setImageError("One or more images exceed 10MB limit");
      } else {
        setImageError("");
      }
  
      
      if (validFiles.length > 0) {
        setImages((prev) => [...prev, ...validFiles]);
      }
  
      e.target.value = "";
    };

  const validate = () => {
    let newErrors: any = {};

    if (!data.address) newErrors.address = "Please provide a location and remember to hit Search";
    if (!data.graffitiOn) newErrors.graffitiOn = "Please select an option";
    if (!data.additionalInfo || data.additionalInfo.trim().length === 0) {
      newErrors.additionalInfo = "Please describe the issue";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Graffiti Data:", data);

      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1000);
  };

  if (showSuccess) {
    return (
    <>
      <h4 className="fw-bold mb-4">Your Graffiti Report</h4>
      <AlertNavigation
        description={[
          "Write down your reference ID: 260504-001201. Use it to track the status of your report.",
          "Graffiti is abated within 72 hours being reported. However, due to location, weather or surface, abatement times may vary. Gang and Offensive graffiti is removed within 1 business day. In order to have gang/offensive graffiti elevated, residents should call the graffiti program directly at (408) 975-7233.",
        ]}
        primaryText="Track my report"
        secondaryText="Return home"
        onPrimary={() => navigate("/track-report")}
        onSecondary={() => navigate("/")}
      />
    </>
    );
  }
  return (
    <div className="container mt-3 mb-4">
      {/* Header */}
      <h4 className="fw-bold mb-4">Your Illegal Dumping Report</h4>
      <p className="text-muted">
        Illegal dumping includes large amounts of garbage and junk left on City of San Jose streets or sidewalks.
      </p>

      {/* Photo Upload Section */}
      <div className="mb-3">
        <label className="fw-bold">Add a Photo</label>
        <p className="text-muted" style={{ fontSize: "13px" }}>
          Help us find it faster. Select any type of image format (Max 10MB
          each)
        </p>

        <div
          className="border rounded d-flex flex-column align-items-center justify-content-center p-4"
          style={{ cursor: "pointer", background: "#f8f9fa" }}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <div style={{ fontSize: "24px" }}>📷</div>
          <p className="mb-0">Drag file here or</p>
          <span className="text-primary">choose from folder</span>
        </div>

        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {/* Preview */}
        {images.length > 0 && (
          <div className="mt-3 d-flex flex-wrap gap-2">
            {images.map((img, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "80px",
                  height: "80px",
                }}
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  width={80}
                  height={80}
                  style={{
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="new-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

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
          Tell us more<span className="text-danger">*</span>
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
          }`}
          style={{ fontSize: "12px" }}
        >
          {data.additionalInfo.length}/4000 characters
        </p>

        {errors.additionalInfo && (
          <p className="text-danger mb-1">{errors.additionalInfo}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="fw-bold">
          Allow public to view your report?<span className="text-danger">*</span>
        </label>
        <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
          No one will see your name 
        </p>

        <div className="mt-2">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="whereIsIt"
              checked={data.whereIsIt === "yes"}
              onChange={() => {
                setData({ ...data, whereIsIt: "yes" });
                setErrors((prev: any) => ({
                  ...prev,
                  whereIsIt: "",
                }));
              }}
            />
            <label className="form-check-label">Yes</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="offensive"
              checked={data.whereIsIt === "no"}
              onChange={() => {
                setData({ ...data, whereIsIt: "no" });
                setErrors((prev: any) => ({
                  ...prev,
                  whereIsIt: "",
                }));
              }}
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
        {errors.whereIsIt && <p className="text-danger">{errors.whereIsIt}</p>}
      </div>

      {/* Submit */}
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
  );
};

export default IllegalDumping;