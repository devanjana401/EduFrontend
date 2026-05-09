import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

const Breadcrumbs = ({ customNames = {} }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // example mappings
  const routeNameMap = {
    courses: "Courses",
    about: "About Us",
    contact: "Contact",
    "my-courses": "My Courses",
    ...customNames,
  };

  return (
    <nav className="flex items-center text-xs font-medium text-slate-500 mb-2 mt-2 whitespace-nowrap overflow-x-auto">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // try to get a mapped name, or format the raw segment
        let displayName = routeNameMap[value];
        if (!displayName) {
          // check if it's likely an ID (numbers only)
          if (/^\d+$/.test(value)) {
            displayName = "Details";
          } else {
            // capitalize first letter
            displayName = value.charAt(0).toUpperCase() + value.slice(1);
          }
        }

        return (
          <React.Fragment key={to}>
            <IoChevronForward className="mx-2 text-slate-400" />
            {isLast ? (
              <span className="text-slate-800 font-semibold">{displayName}</span>
            ) : (
              <Link to={to} className="hover:text-blue-600 transition-colors">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
