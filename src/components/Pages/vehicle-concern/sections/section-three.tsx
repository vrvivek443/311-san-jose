import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export interface SectionThreeRef {
  validate: () => boolean;
}

const SectionThree = forwardRef<SectionThreeRef>((_, ref) => {
  const [cityStreet, setCityStreet] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [errors, setErrors] = useState<any>({});

  const [position, setPosition] = useState({
    lat: 37.3382,
    lng: -121.8863,
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const handleDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setPosition({ lat, lng });
  };

  // ✅ Expose validation
  useImperativeHandle(ref, () => ({
    validate() {
      let newErrors: any = {};

      if (!cityStreet) {
        newErrors.cityStreet = "Please select Yes or No";
      }

      if (!address) {
        newErrors.address = "Address is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
  }));

  return (
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
              checked={cityStreet === "yes"}
              onChange={() => setCityStreet("yes")}
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
              checked={cityStreet === "no"}
              onChange={() => setCityStreet("no")}
            />
            <label className="form-check-label" htmlFor="no">
              No
            </label>
          </div>
        </div>

        {errors.cityStreet && (
          <p className="text-danger">{errors.cityStreet}</p>
        )}
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {errors.address && (
          <p className="text-danger">{errors.address}</p>
        )}

        <button type="button" className="next-btn mb-3 search-btn">
          <span>Search (required)</span>
          <span className="icon">🔍</span>
        </button>
      </div>

      {/* Map */}
      <div className="mb-3">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={13}
          >
            <Marker
              position={position}
              draggable
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
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>
    </div>
  );
});

export default SectionThree;