import React from 'react'
import delivery from '../Assets/Icons/delivery.png'
import support from '../Assets/Icons/24-7.png'
import refund from '../Assets/Icons/refund.png'
export default function Banner() {
  return (
      <div className='flex flex-wrap h-auto mx-10 md:mx-32 py-3 flex-row gap-5 justify-center mt-10     '>
            <div className='   flex flex-col justify-center items-center gap-2'>
                <div className='p-5 flex justify-center'>
                    <img src={delivery} alt="" style={{height:"100px"}} />
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-center'>FREE AND FAST DELIVERY</h1>
                </div>
                <div>
                    <h1 className='text-md text-center'>Free Delivery for all orders over $140</h1>
                </div>
            </div>
            <div className='   flex flex-col justify-center items-center gap-2'>
                <div className='p-5 flex justify-center'>
                    <img src={support} alt="" style={{height:"100px"}} />
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-center'>24/7 CUSTOMER SERVICE</h1>
                </div>
                <div>
                    <h1 className='text-md text-center'>Friendly 24/7 Customer Support</h1>
                </div>
            </div>
            <div className='  flex flex-col justify-center items-center gap-2'>
                <div className='p-5 flex justify-center'>
                    <img src={refund} alt="" style={{height:"100px"}} />
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-center'>MONEY BACK GUARANTEE</h1>
                </div>
                <div>
                    <h1 className='text-md text-center'>We return money within 30 days</h1>
                </div>
            </div>
           
           
      </div>
   
  )
}
