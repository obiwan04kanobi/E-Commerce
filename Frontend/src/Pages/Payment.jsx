import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Payment = () => {
  const key_id = "rzp_test_JDumAGUYVqtCC3";
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const navigateTo = useNavigate(); // Initialize useNavigate for navigation
  
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/order/${searchParams.get("q")}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  async function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");



    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // Fetch CSRF token and set it in axios headers
      const csrfToken = await getCSRFToken();

      // Post data with CSRF token
      const result = await axios.post(
        "http://localhost:8000/api/create_razorpay_order/",
        {
          amount: parseFloat(order.price) * 100,
          order_id: searchParams.get("q"),
          currency: "INR",
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      console.log("Razorpay order creation result:", result.data);

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: key_id,
        amount: amount.toString(),
        currency: currency,
        name: `${order.firstName} ${order.lastName}`,
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || " ",
            razorpaySignature: response.razorpay_signature || " ",
          };

          try {
            await axios.put(
              `http://localhost:8000/api/order/update/${searchParams.get("q")}/`,
              {
                paymentDetails: data,
                paymentStatus: "paid",
                deliver_status: "processing",
                userId: userId,
                productIdQuantityArray: order.productIdQuantityArray,
              },
              {
                headers: {
                  "X-CSRFToken": csrfToken,
                },
              }
            );

            localStorage.clear();
            // Redirect to cart page after successful payment
            navigateTo('/');
          } catch (error) {
            console.error("Error updating order:", error);
          }
        },
        prefill: {
          name: `${order.firstName} ${order.lastName}`,
          email: order.email,
          contact: order.contact,
        },
        notes: {
          address: order.address,
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  }

  async function getCSRFToken() {
    try {
      const response = await axios.get("http://localhost:8000/api/csrf/");
      const csrfToken = response.data.csrfToken;
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
      return csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Continue to Payment now!</p>
        <button className="App-link" onClick={displayRazorpay}>
          Pay ₹{order && order.price}
        </button>
      </header>
    </div>
  );
};

export default Payment;
