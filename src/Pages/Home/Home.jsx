import React from 'react';
import Banner from '../../Components/Header/Banner';
import LatestProducts from '../../Components/LatestProducts/LatestProducts';
import Review from '../../Components/Review/Review';

const Home = () => {
    return (
        <div>
            <div className="">
                <Banner></Banner>
            </div>
            <div className="">
                <LatestProducts></LatestProducts>
            </div>
            <div className="">
                <Review></Review>
            </div>
        </div>
    );
};

export default Home;