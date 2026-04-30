import React from "react";

interface AlertNavigationProps {
  title?: string;
  description: string[];
  links?: { label: string; url?: string }[];
  primaryText: string;
  secondaryText: string;
  onPrimary: () => void;
  onSecondary: () => void;
}

const AlertNavigation: React.FC<AlertNavigationProps> = ({
  description,
  links,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
}) => {
  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        {/* Content */}
        {description.map((text, i) => (
          <p key={i}>{text}</p>
        ))}

        {/* Optional Links */}
        {links && (
          <ul>
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.url || "#"} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="mt-4">
          <button className="btn btn-color w-100 mb-2" onClick={onPrimary}>
            {primaryText}
          </button>

          <button
            className="btn btn-outline-secondary w-100"
            onClick={onSecondary}
          >
            {secondaryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertNavigation;