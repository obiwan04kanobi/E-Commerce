import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase/Config';
import { AddToWishList } from '../Redux/Products/ProductReducer';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

const Description = () => {
  const [image, setImage] = useState('');
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {userId} = useSelector(state=>state.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDoc(doc(db, "Products", id));
    setProduct(querySnapshot.data());
    setLoading(false);
  }

  return (
    <>
      {
        loading ? (
          <div><div class="loader">
          <div class="loader-square"></div>
          <div class="loader-square"></div>
          <div class="loader-square"></div>
          <div class="loader-square"></div>
          <div class="loader-square"></div>
          <div class="loader-square"></div>
          <div class="loader-square"></div>
      </div></div >
        ) : (
          // <div className="flex flex-col items-center justify-center bg-gray-200 h-screen">
          //   <div className="flex items-center">
          //     <img src={image} alt="Random Image" className="w-64 h-64 object-cover rounded-lg mr-4" />
          //   </div>
          //   <button onClick={()=>dispatch(AddToWishList({...product,userId}))} className="p-2.5 ms-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Add to Wishlist</button>
          //   <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl">
          //     <div className="flex items-center mb-4">
          //       <div className="text-xl font-bold mr-2">{product.Name}</div>
          //       <div className="text-xl font-medium line-through text-gray-500">{product.Price*1.5}</div>
          //       <div className="text-xl font-bold ml-2 text-red-500">{product.Price}</div>
          //     </div>
          //     <div className="text-gray-600">{product.Description}</div>
          //     {/* <div className="flex items-center mt-4">
          //       <div className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Prime Video</div>
          //       <div className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Disney+</div>
          //       <div className="bg-blue-500 text-white py-1 px-2 rounded">NETFLIX</div>
          //     </div> */}
          //     <div className="flex items-center mt-4">
          //       <div className="text-xl font-bold mr-2">{parseInt(product.Stock)?"In Stock" : "Out Of Stock"}</div>
          //       <div className="bg-green-500 text-white py-1 px-2 rounded">{product.Stock}</div>
          //     </div>
          //     <div className="flex items-center mt-4">
          //       <div className="text-xl font-bold mr-2">Ratings</div>
          //       <div className="text-xl font-medium">{product.Rating}</div>
          //     </div>
          //     <div className="flex mt-4">
          //       <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">ADD TO CART</button>
          //       <button className="bg-gray-500 text-white py-2 px-4 rounded">BUY NOW</button>
          //     </div>
          //   </div>
          // </div>
          <div class="bg-gray-100 dark:bg-gray-800 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img class="w-full h-full object-cover" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image"/>
                </div>
                <div class="flex -mx-2 mb-4">
                    <div class="w-1/2 px-2">
                        <button class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div class="w-1/2 px-2">
                        <button onClick={()=>dispatch(AddToWishList({...product,userId}))} class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div class="md:flex-1 px-4">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                   {product.Name}
                </p>
                <div class="flex mb-4">
                    <div class="mr-4">
                        <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span class="text-gray-600 dark:text-gray-300">{product.Price}</span>
                    </div>
                    <div>
                        <span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                        <span class="text-gray-600 dark:text-gray-300">{product.Stock}</span>
                    </div>
                </div>
                <div class="mb-4">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                    <div class="flex items-center mt-2">
                        <button class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                    </div>
                </div>
                <div class="mb-4">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                    <div class="flex items-center mt-2">
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                    </div>
                </div>
                <div>
                    <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {product.Description}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
        )
      }
    </>
  );
};

export default Description;