import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex flex-col items-center justify-center my-12 text-center'>
            <div className='inline-flex items-center justify-center text-center bg-transparent text-[#ffffffaf] rounded-full px-10 py-1 gap-1.5 border border-[#ffffffaf]'>
                <p className='text-xs sm:text-sm font-light'>From words to wonder</p>
                <img src="/shooting_star.svg" alt="" />
            </div>

            <h1 className='text-4xl max-w-[300px] text-[#b49166] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn Ideas Into <span className='text-white'>Images.</span> Instantly.</h1>

            <p className='text-center max-w-xl sm:max-w-[590px] mx-auto mt-5'>From simple descriptions to complex ideas, turn your thoughts into visual reality with advanced AI image generation. <span className='text-[#b49166]'>No design experience needed.</span></p>

            <Link to={"/result"}>
                <button className='bg-[#b49166] w-auto border-none rounded-full px-12 py-3 mt-8 flex items-center justify-center text-center gap-2 hover:bg-[#a17f5c] transition-all duration-500 cursor-pointer hover:scale-105'>
                    <p className='sm:text-lg text-black font-medium'>Generate Image</p>
                    <img src="/star.png" alt="" className='h-6' />
                </button>
            </Link>

            <div className='flex flex-wrap items-center justify-center gap-3 mt-16'>
                {Array(6).fill('').map((item, index) => (
                    <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 === 0 ? "/sample_img_2.png" : "/sample_img_1.png"} alt="" key={index} width={70} />
                ))}
            </div>
            <p className='mt-2 text-[#ffffffaf]'>Generated images from <span className='text-[#967a56]'>ImaginAI</span></p>
        </div>
    )
}

export default Header
