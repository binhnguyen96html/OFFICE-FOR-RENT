import React, { useEffect, useState } from 'react';
//import CarouselComponent from '../components/CarouselComponent';
// import cookListData from '../data/cookListData.js';
// import products from '../data/data.js';
//import MenuCard from '../components/MenuCard.jsx';
//import ProductCard from '../components/ProductCard.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';


const HomePage = () => {
    const [menusData, setMenusData] = useState([]);
    const [productsData, setProductsData] = useState([]);


    return (
        <div>
            <div className="overflow-hidden">
                <div>
                    <h1 className="text-green-700 py-3 font-semibold text-2xl">
                        Vietnamese Cuisine
                    </h1>

                </div>

                <div className="mt-6">
                    <h1 className="text-green-700 py-3 font-semibold text-2xl">
                        Products
                    </h1>

                </div>
            </div>
        </div>
    );
};

export default HomePage;