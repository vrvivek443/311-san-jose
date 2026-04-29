import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "../../../shared/modal/modal";

export interface SectionTwoRef {
  validate: () => boolean;
}

interface SectionTwoProps {
  data: {
    image: File | null;
    noPhoto: boolean;
  };
  onChange: (data: any) => void;
}

const SectionTwo = forwardRef<SectionTwoRef, SectionTwoProps>(
  ({ data, onChange }, ref) => {
    const [error, setError] = useState("");

    const { image, noPhoto } = data;
    const [showModal, setShowModal] = useState(false);

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
      <>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          message="We prioritize investigating reports that include a photo of the vehicle.

Including a photo with your report helps our officers locate the vehicle faster and easier thus helping expedite the investigation"
          primaryText="Upload Photo"
          secondaryText="I understand, continue"
          onPrimary={() => {
            onChange({
              image: null,
              noPhoto: false,
            });

            setShowModal(false);
          }}
          onSecondary={() => {
            setShowModal(false);
          }}
        />
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
                  onChange({
                    image: file,
                    noPhoto: false,
                  });
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
                onChange({
                  image: null,
                  noPhoto: true,
                });

                setShowModal(true);
              }}
            />
            <label className="form-check-label">I don't have a photo</label>
          </div>

          {error && <p className="text-danger">{error}</p>}
        </div>
      </>
    );
  },
);

export default SectionTwo;
