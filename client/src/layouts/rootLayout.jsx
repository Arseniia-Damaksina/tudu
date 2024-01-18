import { Outlet } from "react-router-dom";
import Header from "../Components/header/header";

const RootLayout = () => {
    return (
        <div className="root-layout">
            <header  >
                <Header />
                {/* <HeaderDashboard /> */}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
