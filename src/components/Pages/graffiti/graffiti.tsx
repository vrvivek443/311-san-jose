import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const Graffiti = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");

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

    let hasError = false;

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        hasError = true;
        return false;
      }
      return true;
    });

    if (hasError) {
      setImageError("One or more images exceed 10MB limit");
    } else {
      setImageError("");
    }

    // ✅ only add valid files
    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
    }
  };

  const validate = () => {
    let newErrors: any = {};

    if (!data.address) newErrors.address = "Address is required";
    if (!data.graffitiOn) newErrors.graffitiOn = "Please select an option";
    if (!data.additionalInfo)
      newErrors.additionalInfo = "This field is required";
    if (!data.whereIsIt) newErrors.whereIsIt = "Please select an option";

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
              onChange={() => setData({ ...data, isPublic: "yes" })}
            />
            <label className="form-check-label">Yes</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="public"
              checked={data.isPublic === "no"}
              onChange={() => setData({ ...data, isPublic: "no" })}
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
              onChange={() => setData({ ...data, isOffensive: "yes" })}
            />
            <label className="form-check-label">Yes</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="offensive"
              checked={data.isOffensive === "no"}
              onChange={() => setData({ ...data, isOffensive: "no" })}
            />
            <label className="form-check-label">No</label>
          </div>
        </div>
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
              name="whereIsIt"
              checked={data.whereIsIt === "yes"}
              onChange={() => setData({ ...data, whereIsIt: "yes" })}
            />
            <label className="form-check-label">Yes</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="offensive"
              checked={data.whereIsIt === "no"}
              onChange={() => setData({ ...data, whereIsIt: "no" })}
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
    </div>
  );
};

export default Graffiti;
