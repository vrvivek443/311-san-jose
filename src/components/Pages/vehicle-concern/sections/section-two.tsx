import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface SectionTwoRef {
  validate: () => boolean;
}

const SectionTwo = forwardRef<SectionTwoRef>((_, ref) => {
  const [image, setImage] = useState<File | null>(null);
  const [noPhoto, setNoPhoto] = useState(false);
  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    validate() {
      if (!image && !noPhoto) {
        setError("Please upload a photo or select 'I don't have a photo'");
        return false;
      }
      setError("");
      return true;
    },
  }));

  return (
    <div className="container mt-4">
      <label className="form-label fw-bold">
        Upload / take vehicle photo
      </label>

      <p className="text-muted mb-3">
        Photo should show the vehicle condition being reported
      </p>

      <div className="d-flex justify-content-center border border-2 p-4 mb-2">
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          Add photo
        </label>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="d-none"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage(file);
              setNoPhoto(false);
            }
          }}
        />
      </div>

      <p className="text-muted small">Max 10 MB</p>

      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          checked={noPhoto}
          onChange={() => {
            setNoPhoto(true);
            setImage(null);
          }}
        />
        <label className="form-check-label">I don't have a photo</label>
      </div>

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
});

export default SectionTwo;