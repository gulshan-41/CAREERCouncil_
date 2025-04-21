import "./breadCrum.scss";
import Arrow from "/src/assets/icons/right-arrow.svg";
import { Link, useLocation } from "react-router-dom";

function BreadCrum() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <ol className="breadcrum">
      <li>
        <Link to="/">Home</Link>
      </li>
      {pathnames.map((value, index) => {
        // Skip rendering catID in breadcrumb, only show "Categories"
        if (index === pathnames.length - 1 && pathnames[index - 1] === "categories") {
          return null; // Skip catID
        }
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const displayName =
          value === "categories"
            ? "Categories"
            : value.charAt(0).toUpperCase() + value.slice(1);
        return (
          <li key={to}>
            <span className="separator">
              <img src={Arrow} alt="right-arrow" />
            </span>
            <Link to={to}>{displayName}</Link>
          </li>
        );
      })}
    </ol>
  );
}

export default BreadCrum;