import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Resetpassword = () => {
  const [reset, setReset] = useState({
    email: "",
  });
  const [loading, setloading] = useState(false);
  const navigateTo = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === true) {
    //   navigateTo("/");
    }
  }, [isLoggedIn]);

  const handleReset = (e) => {
    e.preventDefault();
    setloading(true);
    sendPasswordResetEmail(auth, reset.email, {
      url: "http://localhost:5174/"
    })
      .then(() => {
        toast.success("Link Sent Successfully");
        setloading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setloading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {/* {loading && <Loader />} */}
      <section className='bg-blue-200 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[87vh] lg:py-0'>
          <div className='w-full bg-blue-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Reset Password
              </h1>
              <form
                className='space-y-4 md:space-y-6'
                action='#'
                onSubmit={handleReset}
              >
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required=''
                    value={reset.email}
                    onChange={(e) =>
                      setReset({ ...reset, email: e.target.value })
                    }
                  />
                </div>
                <button
                aria-label="reset"
                    
                  type='submit'
                  className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resetpassword;