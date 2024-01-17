"use client";
import React from 'react'
import Lottie from 'lottie-react'

import bannerAni from "@/../public/banner.json";

export default function Banner() {
  return (
    <div>
    <div className="mb-10 mt-3 px-5">
      <div className=" flex ps-3 lg:ps-1  justify-between lg:pt-10 mx-auto max-w-screen-2xl">
        <div className="lg:mt-10 lg:pt-10 pt-6 text-start ">
          

          <h1 className="lg:text-[55px] md:text-[25px] text-[13px] font-bold  mt-2 md:pb-5 lg:mt-2   lg:absolute md:absolute lg:absolute">
          Culinary Delights: 
          </h1>
          <h3 className="lg:text-[55px] md:text-[25px] text-[13px] font-bold pt-2  lg:mt-10 lg:pt-10 md:pt-9 md:relative relative lg:relative text-yellow-500">
          Explore, Create, Savor with Recipe App.
          </h3>

         

        </div>

        {/* animation part */}

        <div className="w-[50%] h-[50%] ">
          <Lottie
            animationData={bannerAni}
            loop={true}
          
          />
        </div>
      </div>
    </div>
  </div>
  )
}
