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
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to}>
              <span className="separator">
                <img src={Arrow} alt="right-arrow" />
              </span>
              <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
            </li>
          );
        })}
    </ol>
  );
}

export default BreadCrum;