

import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { GetProducts } from '../../apicalls/products';
import Divider from '../../components/Divider';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import { useSelector, useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import PayButton from '../../components/PayButton';

function Home() {
    const [showFilters, setShowFilters] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); 
    const [filters, setFilters] = useState({
        status: 'approved',
        category: [],
        age: [],
        location: '',  //new location filter

    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showPayButton, setShowPayButton] = useState(false); // State for showing the PayButton

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts({...filters});
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, [filters]);

    // Handle Buy Now button click
    const handleBuyNowClick = () => {
        setShowPayButton(true); // Show the PayButton component
    };

    // Step 3: Filter products based on the search query
    const filteredProducts = products.filter((product) => {
        const productName = product.name.toLowerCase();
        return productName.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="flex gap-5">
            {showFilters && (
                <Filters
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    filters={filters}
                    setFilters={setFilters}
                />
            )}
            <div className="flex flex-col gap-5 w-full">
                <div className="flex gap-5 items-center">
                    {!showFilters && (
                        <i
                            className="ri-equalizer-line text-xl cursor-pointer"
                            onClick={() => setShowFilters(!showFilters)}
                        ></i>
                    )}
                    <input
                        type="text"
                        placeholder="Search Products here...."
                        className="border border-gray-300 rounded border-solid w-full px-2 py-1 h-14"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={`grid gap-5 ${showFilters ? 'grid-cols-4' : 'grid-cols-5'}`}>
                    {filteredProducts.map((product) => {
                        return (
                            <div
                                className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
                                key={product._id}
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <img
                                    src={product.images[0]}
                                    className="w-full h-48 p-2 rounded-md object-cover"
                                    alt=""
                                />
                                <div className="px-2 flex flex-col">
                                    <h1 className="text-lg font-semibold">{product.name}</h1>
                                    <p className='text-sm'>{product.age} {' '}
                                        {product.age === 1 ? "year" : "years"} {' '}
                                        old
                                    </p>
                                    <Divider />
                                    <span className="text-xl font-semibold text-green-500">
                                        ₹ {product.price}
                                    </span>
                                    <Button
                                        type="primary"
                                        onClick={handleBuyNowClick} // Call the function when Buy Now is clicked
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Conditionally render the PayButton component */}
            {showPayButton && (
                <PayButton cartItems={cart.cartItems} />
            )}
        </div>
    );
}

export default Home;
