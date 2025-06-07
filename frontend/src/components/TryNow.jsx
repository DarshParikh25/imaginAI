import React from 'react'
import { Link } from 'react-router-dom'

const TryNow = () => {
    return (
        <div className='flex flex-col items-center justify-center py-24 text-center'>
            <h2 className='text-3xl sm:text-4xl font-semibold mb-8 text-[#b49166]'>See the magic. Try now.</h2>

            <Link to={"/result"}>
                <button className='bg-[#b49166] w-auto border-none rounded-full px-12 py-3 mt-8 flex items-center justify-center text-center gap-2 hover:bg-[#a17f5c] transition-all duration-500 cursor-pointer hover:scale-105'>
                    <p className='sm:text-lg text-black font-medium'>Generate Image</p>
                    <img src="/star.png" alt="" className='h-6' />
                </button>
            </Link>
        </div>
    )
}

export default TryNow
