import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "@/pages/HomePage/HomePage";
import Layout from "@/widgets/Layout";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
               <Route path="/" element={<Layout />} >
                   <Route index element={<HomePage />} />
                   <Route path="/home" element={<HomePage />} />

               </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;