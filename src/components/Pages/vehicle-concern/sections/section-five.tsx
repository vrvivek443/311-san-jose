import React, { forwardRef, useImperativeHandle, useMemo } from "react";

export interface SectionFiveRef {
  validate: () => boolean;
}

interface SectionFiveProps {
  section4Value: string;
  data: {
    selected: string[];
    notes: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  onChange: (data: any) => void;
}

const SectionFive = forwardRef<SectionFiveRef, SectionFiveProps>(
  ({ section4Value, data, onChange }, ref) => {
    const [error, setError] = React.useState("");

    // ✅ Determine selection type
    const isSingleSelect = section4Value === "POO" || section4Value === "ISS";

    const headerConfig = useMemo(() => {
      switch (section4Value) {
        case "LIV":
        case "TRA":
          return {
            title:
              "Please select at least one option that applies to the vehicle you are reporting:",
          };

        case "PAR":
          return {
            title:
              "If the vehicle is in a park, creek or a trail, select at least one option that applies to the vehicle you are reporting:",
          };

        case "PRI":
          return {
            title:
              "If the vehicle is on a residential private property, select at least one option that applies to the vehicle you are reporting:",
          };

        case "POO":
          return {
            title:
              "Vehicles will be investigated if they meet one of these qualifying conditions:",
            description:
              "Select one option that best describes the problem you are reporting.",
          };

        case "ISS":
          return {
            title:
              "Please select at least one option that describes the vehicle (parked on a city street):",
          };

        case "CRI":
          return {
            title:
              "What potential criminal activity did you witness involving this vehicle? Please describe:",
            description:
              "Always put your safety first. Gather information discreetly. Never confront suspicious persons.",
          };

        default:
          return {
            title: "Please select an option",
            description: "",
          };
      }
    }, [section4Value]);

    const options = useMemo(() => {
      switch (section4Value) {
        case "LIV":
          return [
            "I have seen a person(s) living/ going in and out of the vehicle.",
            "RV with trash around it - assumed that people are living in it.",
            "A car with a trailer attached with trash around it - assumed that people are living in them.",
          ];

        case "TRA":
          return [
            "Sewage/ bio- waste leaking from/ around the vehicle",
            "Trash/ items outside of the vehicle on the sidewalk or in the street",
          ];

        case "PAR":
          return [
            "The vehicle looks abandoned/ undrivable (but no-one is living in it)",
            "The vehicle is burned (but no-one is living in it)",
            "There is trash around the vehicle",
            "The vehicle is on a trail blocking the path",
          ];

        case "PRI":
          return [
            "Commercial vehicle with gross vehicle weight over 10,000 pounds",
            "Unmounted camper shell visible from the street",
            "Inoperable vehicle stored on private property visible from the street",
            "Vehicle or boat being stored in the rear/side yard of a residential property within 5 feet of a property line",
            "Person running an auto repair business from home",
            "Person living in RV or their vehicle for over 72 hours",
            "Vehicle parked on unpaved surface, front yard or lawn",
            "Abandoned vehicle on private land",
          ];

        case "POO":
          return [
            "Burned out vehicle",
            "On jacks/ blocks",
            "Missing or shattered windows",
            "Vandalized/ Graffiti (non-commercial vehicle)",
            "With significantly flat tire(s)",
            "Missing tire or wheel",
            "Have deployed airbags/ Significant damage",
            "Unsecured/ Open doors or trunk",
            "Displaying salvage, accident, or auction markings on windshield",
            "Displaying multiple aged or weathered citations",
            "Attracting illegal dumping activities",
            "Inoperable vehicles (as defined by the California Vehicle Code: missing essential parts, such as, the windshield, steering wheel, driver's seat, engine, or two or more wheels)",
          ];

        case "ISS":
          return [
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
          ];

        case "CRI":
          return [
            "You suspect drugs being sold out of this vehicle.",
            "You suspect prostitution/ human trafficking activity in this vehicle.",
          ];

        default:
          return [];
      }
    }, [section4Value]);

    // ✅ Handle selection
    const handleSelect = (option: string) => {
      if (isSingleSelect) {
        onChange({ ...data, selected: [option] }); // radio behavior
      } else {
        const exists = data.selected.includes(option);
        const updated = exists
          ? data.selected.filter((item) => item !== option)
          : [...data.selected, option];

        onChange({ ...data, selected: updated });
      }
    };

    // ✅ Validation
    useImperativeHandle(ref, () => ({
      validate() {
        if (!data.selected || data.selected.length === 0) {
          setError("Please select at least one option");
          return false;
        }
        setError("");
        return true;
      },
    }));

    return (
      <div className="container mt-3 mb-4">
        <h5 className="fw-bold">
          {headerConfig.title}
          <span className="text-danger"> *</span>
        </h5>

        {headerConfig.description && (
          <p className="text-muted">{headerConfig.description}</p>
        )}

        <div className="list-group mb-3">
          {options.length > 0 ? (
            options.map((option, index) => (
              <label
                key={index}
                className="list-group-item list-group-item-action d-flex gap-2 align-items-start"
                style={{ cursor: "pointer" }}
              >
                <input
                  className="form-check-input mt-1"
                  type={isSingleSelect ? "radio" : "checkbox"} // ✅ dynamic
                  name="case5Option"
                  checked={data.selected.includes(option)}
                  onChange={() => handleSelect(option)}
                />
                <span>{option}</span>
              </label>
            ))
          ) : (
            <p className="text-muted">No options available</p>
          )}
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label className="fw-semibold mb-2">
            Additional Information - If any
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Type in Text"
            value={data.notes}
            onChange={(e) => onChange({ ...data, notes: e.target.value })}
          />
        </div>

        {section4Value === "CRI" && (
          <div className="mt-4">
            <h6 className="fw-bold">
              Please provide your contact information below:
            </h6>
            <p className="text-muted">
              It will be helpful if investigators have a way to contact you to
              follow-up with any additional questions.
            </p>

            <div className="mb-3">
              <label className="form-label">Your first name:</label>
              <input
                type="text"
                className="form-control"
                value={data.firstName || ""}
                onChange={(e) =>
                  onChange({ ...data, firstName: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Your last name:</label>
              <input
                type="text"
                className="form-control"
                value={data.lastName || ""}
                onChange={(e) =>
                  onChange({ ...data, lastName: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address:</label>
              <input
                type="email"
                className="form-control"
                value={data.email || ""}
                onChange={(e) => onChange({ ...data, email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="xxx-xxx-xxxx"
                value={data.phone || ""}
                onChange={(e) => onChange({ ...data, phone: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    );
  },
);

export default SectionFive;
