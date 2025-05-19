import "./mainLayout.scss";
import { Outlet } from "react-router-dom";
import NavBar from "/src/components/NavBar/NavBar";
import SearchDiv from "/src/components/searchDiv/searchDiv";
import SideBar from "/src/components/sideBar/sideBar";
// import ArrowAI from "/src/components/arrowAI/arrowAI";
import HelpBar from "../../components/helpBar/helpBar";
import MainFooter from "../../components/footers/mainFooter/mainFooter";
import { useRef } from "react";

function MainLayout() {
    const mainSectionRef = useRef(null);

    return (
        <div className="mainlayout">
            <NavBar />
            <SearchDiv />
            <SideBar mainSectionRef={mainSectionRef} />
            <main className="mainLayout-main-section" ref={mainSectionRef} >
                <Outlet />
            </main>
            {/* <ArrowAI /> */}
            <HelpBar />
            <MainFooter />
        </div>
    );
}

export default MainLayout;