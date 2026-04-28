// import React, { useState } from "react";

// // Importing images and items
// import vehicle from "../assets/logo-Images/Vehicle-Concern.png";
// import graffiti from "../assets/logo-Images/graffiti.png";
// import dump from "../assets/logo-Images/illegal-dumping.png";
// import pothole from "../assets/logo-Images/pothole.png";
// import light from "../assets/logo-Images/streetlight-outage.png";
// import other from "../assets/logo-Images/other-issues.png";
// import fire from "../assets/logo-Images/Illegal-Fireworks.png";
// import wifi from "../assets/logo-Images/Community-wifi.png";
// import sewer from "../assets/logo-Images/SewerOldIssues.png";
// import payutility from "../assets/logo-Images/PUB60x60.png";
// import rentregistry from "../assets/logo-Images/RentRegistry.png";
// import eviction from "../assets/logo-Images/eviction-prevention.png";
// import affordablehousing from "../assets/logo-Images/affordable-housing.png";
// import streetsweeping from "../assets/logo-Images/Street Sweeping 1.svg";
// import junkpickup from "../assets/logo-Images/bulk-item-pickup.png";
// import containerissue from "../assets/logo-Images/cart-issues.png";
// import missedcollection from "../assets/logo-Images/missed-collection.png";
// import servicenewhomes from "../assets/logo-Images/create-new-services.png";
// import mycollectionscheduele from "../assets/logo-Images/collection-schedule.png";

// // FAQ items
// const faqItems = [
//   { label: "Need to contact the City?", description: "Our friendly team is available 24/7 to address your concerns. Feel free to call us with any questions." },
//   { label: "Service Expectations", description: "Staff reviews all 311 reports but only abandoned vehicles that pose a health, safety, or extreme blight concern are being investigated." },
//   { label: "Send Feedback", description: "For issues related to service delivery, email customerservice@sanjoseca.gov. For technical issues, review solutions in the San Jose 311 Website or Mobile App." },
//   { label: "Troubleshooting 311 Technical Problems", description: "What to do if you have login issues or are unable to submit your request." },
//   { label: "Accessibility Statement for San Jose 311", description: "San Jose 311 is committed to ensuring accessibility for people with disabilities. Our goal is to keep the city well maintained." }
// ];

// // Report, Looking, and Recycling items
// const reportItems = [
//   { img: vehicle, label: "Vehicle Concerns" },
//   { img: graffiti, label: "Graffiti" },
//   { img: dump, label: "Illegal Dumping" },
//   { img: pothole, label: "Pothole" },
//   { img: light, label: "Streetlight Outage" },
//   { img: other, label: "Other Issues" },
//   { img: fire, label: "Illegal Fireworks" },
//   { img: wifi, label: "Community WiFi" },
//   { img: sewer, label: "Sewer / Water Issues" },
// ];

// const lookingitems = [
//   { img: payutility, label: "Pay Utility Bills" },
//   { img: rentregistry, label: "Rent Registry Tenant Portal" },
//   { img: eviction, label: "Eviction Prevention" },
//   { img: affordablehousing, label: "Affordable Housing" },
//   { img: streetsweeping, label: "Street Sweeping" },
// ];

// const recyclingitems = [
//   { img: junkpickup, label: "Junk Pickup" },
//   { img: containerissue, label: "Container Issues" },
//   { img: missedcollection, label: "Missed Collection" },
//   { img: servicenewhomes, label: "Services for New Homes" },
//   { img: mycollectionscheduele, label: "My Collection Schedule" },
// ];

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter items based on search query
//   const filteredReportItems = reportItems.filter(item =>
//     item.label.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//       {/* Search bar and Show All button */}

//       {/* What would you like to report section */}
//       <div className="dashboard">
//         <h3 className="section-title">What would you like to report?</h3>
//         <div className="tile-grid">
//           {filteredReportItems.map((item, index) => (
//             <div className="tile" key={index}>
//               <div className="tile-icon">
//                 <img src={item.img} alt={item.label} />
//               </div>
//               <p className="tile-label">{item.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Looking for section */}
//       <div className="dashboard">
//         <h3 className="section-title">Looking for</h3>
//         <div className="tile-grid">
//           {lookingitems.map((item, index) => (
//             <div className="tile" key={index}>
//               <div className="tile-icon">
//                 <img src={item.img} alt={item.label} />
//               </div>
//               <p className="tile-label">{item.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Residential Garbage & Recycling Services section */}
//       <div className="dashboard">
//         <h3 className="section-title">Residential Garbage & Recycling Services</h3>
//         <div className="tile-grid">
//           {recyclingitems.map((item, index) => (
//             <div className="tile" key={index}>
//               <div className="tile-icon">
//                 <img src={item.img} alt={item.label} />
//               </div>
//               <p className="tile-label">{item.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="dashboard">
//         <h3 className="section-title">Find Answers about City Services</h3>
//         <div className="search-section">
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="e.g. what's illegal dumping?"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <button className="show-all-btn">Show All</button>
//       </div>
//         <div className="faq-list">
//           {faqItems.map((item, index) => (
//             <div className="faq-item" key={index}>
//               <h4 className="faq-label">{item.label}</h4>
//               <p className="faq-description">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importing images and items
import vehicle from "../assets/logo-Images/Vehicle-Concern.png";
import graffiti from "../assets/logo-Images/graffiti.png";
import dump from "../assets/logo-Images/illegal-dumping.png";
import pothole from "../assets/logo-Images/pothole.png";
import light from "../assets/logo-Images/streetlight-outage.png";
import other from "../assets/logo-Images/other-issues.png";
import fire from "../assets/logo-Images/Illegal-Fireworks.png";
import wifi from "../assets/logo-Images/Community-wifi.png";
import sewer from "../assets/logo-Images/SewerOldIssues.png";
import payutility from "../assets/logo-Images/PUB60x60.png";
import rentregistry from "../assets/logo-Images/RentRegistry.png";
import eviction from "../assets/logo-Images/eviction-prevention.png";
import affordablehousing from "../assets/logo-Images/affordable-housing.png";
import streetsweeping from "../assets/logo-Images/Street Sweeping 1.svg";
import junkpickup from "../assets/logo-Images/bulk-item-pickup.png";
import containerissue from "../assets/logo-Images/cart-issues.png";
import missedcollection from "../assets/logo-Images/missed-collection.png";
import servicenewhomes from "../assets/logo-Images/create-new-services.png";
import mycollectionscheduele from "../assets/logo-Images/collection-schedule.png";

// FAQ items
const faqItems = [
  {
    label: "Need to contact the City?",
    description:
      "Our friendly team is available 24/7 to address your concerns. Feel free to call us with any questions.",
  },
  {
    label: "Service Expectations",
    description:
      "Staff reviews all 311 reports but only abandoned vehicles that pose a health, safety, or extreme blight concern are being investigated.",
  },
  {
    label: "Send Feedback",
    description:
      "For issues related to service delivery, email customerservice@sanjoseca.gov. For technical issues, review solutions in the San Jose 311 Website or Mobile App.",
  },
  {
    label: "Troubleshooting 311 Technical Problems",
    description:
      "What to do if you have login issues or are unable to submit your request.",
  },
  {
    label: "Accessibility Statement for San Jose 311",
    description:
      "San Jose 311 is committed to ensuring accessibility for people with disabilities. Our goal is to keep the city well maintained.",
  },
];

// Report items WITH ROUTES
const reportItems = [
  { img: vehicle, label: "Vehicle Concerns", path: "/vehicle-concern" },
  { img: graffiti, label: "Graffiti", path: "/graffiti" },
  { img: dump, label: "Illegal Dumping", path: "/illegal-dumping" },
  { img: pothole, label: "Pothole", path: "/pothole" },
  { img: light, label: "Streetlight Outage", path: "/streetlight-outage" },
  { img: other, label: "Other Issues", path: "/other-issues" },
  { img: fire, label: "Illegal Fireworks", path: "/illegal-fireworks" },
  { img: wifi, label: "Community WiFi", path: "/community-wifi" },
  { img: sewer, label: "Sewer / Water Issues", path: "/sewer-water" },
];

const lookingitems = [
  { img: payutility, label: "Pay Utility Bills" },
  { img: rentregistry, label: "Rent Registry Tenant Portal" },
  { img: eviction, label: "Eviction Prevention" },
  { img: affordablehousing, label: "Affordable Housing" },
  { img: streetsweeping, label: "Street Sweeping" },
];

const recyclingitems = [
  { img: junkpickup, label: "Junk Pickup" },
  { img: containerissue, label: "Container Issues" },
  { img: missedcollection, label: "Missed Collection" },
  { img: servicenewhomes, label: "Services for New Homes" },
  { img: mycollectionscheduele, label: "My Collection Schedule" },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter items based on search query
  const filteredReportItems = reportItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* What would you like to report section */}
      <div className="dashboard">
        <h3 className="section-title">What would you like to report?</h3>
        <div className="tile-grid">
          {filteredReportItems.map((item, index) => (
            <div
              className="tile"
              key={index}
              onClick={() => item.path && navigate(item.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="tile-icon">
                <img src={item.img} alt={item.label} />
              </div>
              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Looking for section */}
      <div className="dashboard">
        <h3 className="section-title">Looking for</h3>
        <div className="tile-grid">
          {lookingitems.map((item, index) => (
            <div className="tile" key={index}>
              <div className="tile-icon">
                <img src={item.img} alt={item.label} />
              </div>
              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Residential Garbage & Recycling Services section */}
      <div className="dashboard">
        <h3 className="section-title">
          Residential Garbage & Recycling Services
        </h3>
        <div className="tile-grid">
          {recyclingitems.map((item, index) => (
            <div className="tile" key={index}>
              <div className="tile-icon">
                <img src={item.img} alt={item.label} />
              </div>
              <p className="tile-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="dashboard">
        <h3 className="section-title">
          Find Answers about City Services
        </h3>
        <div className="search-section">
          <input
            type="text"
            className="search-bar"
            placeholder="e.g. what's illegal dumping?"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="show-all-btn">Show All</button>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div className="faq-item" key={index}>
              <h4 className="faq-label">{item.label}</h4>
              <p className="faq-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;