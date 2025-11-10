import { Outlet } from "react-router-dom";
import Header from "@/widgets/Layout/Header";
import Footer from "@/widgets/Layout/Footer";
import FreeTrialPromo from "@/widgets/Layout/FreeTrialPromo";



const Layout = () => {



    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <FreeTrialPromo />
            <Footer />
        </div>
    );
};

export default Layout;