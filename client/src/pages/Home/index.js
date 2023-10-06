import React, { useEffect } from 'react';
import { message } from 'antd';
import { GetProducts } from '../../apicalls/products';
import Divider from '../../components/Divider';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import { useSelector,useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice'




function Home() {
    const [showFilters , setShowFilters] = React.useState(true);


    const [products, setProducts] = React.useState([])
    const [filters, setFilters] = React.useState({
        status: 'approved',
        category : [],
        age : [],
    })
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.users);
    const navigate = useNavigate();
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts(filters)
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data)
            }
        } catch (error) {
           dispatch(SetLoader(false));
            message.error(error.message)
        }
    }


   


    useEffect(() => {
        getData();
    }, [filters]);


    return (
        <div className ='flex gap-5'>
            {showFilters && (<Filters
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                filters={filters}
                setFilters={setFilters}
                />
            )}
            <div className='flex flex-col gap-5 w-full'>
                <div className='flex gap-5  items-center '>
                    {!showFilters && <i className="ri-equalizer-line text-xl cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}></i>}
               
                <input type='text'
                placeholder='Search Products here....'
                className='border border-gray-300 rounded border-solid w-full px-2 py-1 h-14'/>
                </div>
            <div className={`grid gap-5 ${showFilters ? 'grid-cols-4' : 'grid-cols-5'}`}>


                {products?.map((product) => {
                    return (
                        <div className='border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer'
                        key={product._id}
                        onClick={() => navigate(`/product/${product._id}`)}>
                            <img src={product.images[0]}
                                className='w-full h-48 p-2 rounded-md object-cover'
                                alt=""
                            />




                           
                            <div className='px-2 flex flex-col'>
                                <h1 className='text-lg font-semibold'>{product.name}</h1>
                                <p className='text-sm text-grqay-500'>{product.description}</p>
                                <Divider />
                                <span
                                    className='text-xl font semibold text-green-500'>
                                    ₹ {product.price}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            </div>
        </div>
    )
}


export default Home

