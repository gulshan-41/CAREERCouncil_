import "./mainLayout.scss";
import { Outlet } from "react-router-dom";
import NavBar from "/src/components/NavBar/NavBar";
import SearchDiv from "/src/components/searchDiv/searchDiv";
import SideBar from "/src/components/sideBar/sideBar";
import ArrowAI from "/src/components/arrowAI/arrowAI";

function MainLayout() {
    return (
        <div className="mainlayout">
            <NavBar />
            <SearchDiv />
            <SideBar />
            <main className="mainLayout-main-section">
                <Outlet />
            </main>
            <ArrowAI />
        </div>
    );
}

export default MainLayout;