import { Outlet } from "react-router-dom";
import Header from "@/widgets/Layout/Header";
import Footer from "@/widgets/Layout/Footer";
import {useState} from "react";


const Layout = () => {

    const getMovieId = () => {

    }

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;