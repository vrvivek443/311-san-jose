import React, { forwardRef, useImperativeHandle, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export interface SectionThreeRef {
  validate: () => boolean;
}

const SectionThree = forwardRef<SectionThreeRef>((_, ref) => {
  const [cityStreet, setCityStreet] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const [position, setPosition] = useState({
    lat: 37.3382,
    lng: -121.8863,
  });

  const handleDragEnd = (e: any) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  useImperativeHandle(ref, () => ({
    validate() {
      if (!cityStreet) {
        setError("Please select Yes or No");
        return false;
      }

      if (!address) {
        setError("Address is required");
        return false;
      }

      setError("");
      return true;
    },
  }));

  return (
    <div className="container mt-3">
      <label className="fw-bold">
        Is the vehicle on a City Street? *
      </label>

      <div className="form-check">
        <input type="radio" onChange={() => setCityStreet("yes")} />
        <label>Yes</label>
      </div>

      <div className="form-check">
        <input type="radio" onChange={() => setCityStreet("no")} />
        <label>No</label>
      </div>

      <div className="mt-3">
        <label className="fw-bold">Where is it? *</label>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "300px" }}
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

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
});

export default SectionThree;