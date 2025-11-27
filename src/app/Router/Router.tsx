import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "@/pages/HomePage/HomePage";
import Layout from "@/widgets/Layout";
import MoviesOpenPage from "@/pages/MoviesOpenPage/MoviesOpenPage";
import SupportPage from "@/pages/SupportPage/SupportPage.tsx";
import SubscriptionPage from "@/pages/SubscriptionPage/SubscriptionPage.tsx";
import MoviesAndShowsPage from "@/pages/MoviesAndShowsPage/MoviesAndShowsPage.tsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
               <Route path="/" element={<Layout />} >
                   <Route index element={<HomePage />} />
                   <Route path="/home" element={<HomePage />} />
                   <Route path="/movie/:id" element={<MoviesOpenPage />} />
                   <Route path="/support" element={<SupportPage /> } />
                   <Route path="/subscriptions" element={<SubscriptionPage /> } />
                   <Route path='/MoviesAndShowsPage' element={<MoviesAndShowsPage />} />
               </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;