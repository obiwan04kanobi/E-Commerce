import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../Redux/User/UserReducer";
import { FetchAllOrders } from "../Redux/Orders/OrderReducer";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { Link, useNavigate } from "react-router-dom";
import { updateOrderStatus } from "../Firebase/utils/updateOrderStatus"; // Import your Firebase update function
import Navbar from "../Components/Navbar";

const OrdersAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();
  // const products = useSelector((state) => state.product.products);
  // const users = useSelector((state) => state.user.users);
  const orders = useSelector((state) => state.order.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser_order();
  }, []);

  const fetchUser_order = async () => {
    dispatch(FetchAllUsers());
    dispatch(FetchAllOrders());
    dispatch(FetchAllProduct());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    // Update the order status in the Firebase database
    await updateOrderStatus(orderId, newStatus);
    // Optionally, you can dispatch an action to update the local state
    dispatch(FetchAllOrders());
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row w-full">
      <div className="p-4 md:hidden">
        <button
          className="text-white bg-green-600 px-4 py-2 rounded"
          onClick={toggleMenu}
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div
        className={`${menuOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-slate-50 border-3 p-4 transition-transform duration-300 ease-in-out`}
      >
        <div onClick={() => navigateTo("/admin/dashboard")}>
          <NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard" />
        </div>
        <NavItem
          icon="fa-cart-shopping"
          text="Products"
          link=""
          subLinks={[
            { text: "All", link: "/admin/product" },
            { text: "New", link: "/admin/product/new" },
          ]}
        />
        <div onClick={() => navigateTo("/admin/orders")}>
          <NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" />
        </div>
        <div onClick={() => navigateTo("/admin/users")}>
          <NavItem icon="fa-users" text="Users" link="/admin/users" />
        </div>
      </div>

      <div className="w-full shadow-md sm:rounded-lg">
        <div className="text-4xl text-center py-4 font-semibold">Orders</div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const totalQuantity = order.productIdQuantityArray.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                );
                return (
                  <tr key={order.id} className="border-b border-gray-300">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.deliver_stauts}</td>
                    <td className="p-3">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="p-3">₹{order.price}</td>
                    <td className="p-3">{totalQuantity}</td>
                    <td className="p-3">
                      <select
                        value={order.deliver_status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-white border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrdersAdmin;

const NavItem = ({ icon, text, link, subLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex gap-4 items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
        onClick={toggleSubMenu}
      >
        <div className="w-[20px]">
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <div className="font-semibold">{text}</div>
        {subLinks.length > 0 && (
          <i
            className={`fa-solid fa-chevron-down ml-auto transform transition-transform ${isOpen ? "rotate-180" : ""
              }`}
          ></i>
        )}
      </div>
      {isOpen && subLinks.length > 0 && (
        <div className="ml-8 mt-2 space-y-1">
          {subLinks.map((subLink, index) => (
            <div key={index}>
              <Link
                to={subLink.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 rounded"
              >
                {subLink.text}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
