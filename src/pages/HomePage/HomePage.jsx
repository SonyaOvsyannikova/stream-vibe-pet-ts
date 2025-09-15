import React from 'react';
import Header from "../../widgets/Header/Header";
import Footer from "../../widgets/Footer/Footer";
import '../../shared/styles/styles.scss'
import Main from "../../widgets/Main/Main";

const HomePage = () => {
    return (
        <div className='content'>
            <Header />

            <Footer />
        </div>
    );
};

export default HomePage;