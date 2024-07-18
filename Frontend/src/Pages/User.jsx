import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../Firebase/Config';
import Navbar from '../Components/Navbar';

const User = () => {
  const [user, setUser] = useState(null);
  const userDetail = useSelector(state => state.user);

  useEffect(() => {
    fetchUserData();
    console.log(userDetail)
  }, []);

  const fetchUserData = async() => {
    const querySnapshot = await getDoc(doc(db, "Users",userDetail.userId)); // Assuming you have your query snapshot

    const query = querySnapshot.data();
    const userData = {
      email: query.email,
      userName: query.username,
      joinedAt: query.createdAt,
    };
    setUser(userData);
  };



  if (!user) {
    return <div> <div><div class="loader">
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
</div></div ></div>;
  }

  return (
<>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl transform  transition-transform duration-300 max-w-4xl w-full mx-4">
        <div className="md:w-1/2 p-6 flex items-center justify-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="rounded-full w-48 h-48 shadow-lg object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 bg-blue-100 text-center flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Username:</label>
            <p className="text-gray-900">{user.userName?user.userName:user.email}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Joined At:</label>
            <p className="text-gray-900">{user.joinedAt}</p>
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default User;
