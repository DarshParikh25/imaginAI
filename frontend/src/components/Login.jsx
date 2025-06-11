import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

    const [state, setState] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(state === 'login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', {
                    email, 
                    password
                })
                if(data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', {
                    name,
                    email,
                    password
                })
                if(data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <motion.div 
            className='fixed left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'
            initial={{ opacity: 0}}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <form 
                onSubmit={handleSubmit}
                className='relative bg-white/75 p-10 rounded-xl text-black'
            >
                <h1 className='text-center text-2xl font-medium text-[#5c4d38]'>{state === 'login' ? 'Log In' : 'Register'}</h1>
                <p className='text-xs text-center'>{state === 'login' ? 'Ready to visualize again? Log in to start.' : 'New here? Let’s get you onboarded.'}</p>
                {
                    state === 'register' && (
                        <div className='border-[1.5px] border-black/50 px-4 py-2 flex items-center rounded-full mt-5 gap-3'>
                            <img src="/name.png" alt="" width={20} />
                            <input
                                onChange={e => {
                                    setName(e.target.value)
                                }}
                                value={ name }
                                type="text" 
                                placeholder='Full Name' 
                                required 
                                className='outline-none placeholder-text text-sm' 
                            />
                        </div>
                    )
                }
                <div className='border-[1.5px] border-black/50 px-4 py-2 flex items-center rounded-full mt-4 gap-3'>
                    <img src="/email.png" alt="" width={20} />
                    <input 
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        value={ email }
                        type="email" 
                        placeholder='Email Id' 
                        required 
                        className='outline-none placeholder-text text-sm' 
                    />
                </div>
                <div className='border-[1.5px] border-black/50 px-4 py-2 flex items-center rounded-full mt-4 gap-3'>
                    <img src="/password.png" alt="" width={20} />
                    <input 
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        value={ password }
                        type="password" 
                        placeholder='Password' 
                        required 
                        className='outline-none placeholder-text text-sm' 
                    />
                </div>
                {
                    state === 'login' && (
                        <p className='text-xs text-blue-900 ml-1 mt-4 cursor-pointer'>Can't remember your password?</p>
                    )
                }
                <button type="submit" className='bg-[#5c4d38] border-none text-white text-sm w-full py-2 rounded-full mt-4 cursor-pointer hover:scale-[1.02] transition-all duration-700'>{state === 'login' ? 'Log In' : 'Register'}</button>
                {
                    state === 'login' ? (
                        <p className='mt-5 text-center text-xs'>New here? <span onClick={() => {setState('register')}} className='text-blue-900 cursor-pointer'>Register Now!</span></p>
                    ) : (
                        <p className='mt-5 text-center text-xs'>Existing user? <span onClick={() => {setState('login')}} className='text-blue-900 cursor-pointer'>Log In!</span></p>
                    )
                }
                <img src="/close.svg" alt="" onClick={() => {setShowLogin(false)}} className='absolute top-5 right-5 cursor-pointer' />
            </form>
        </motion.div>
    )
}

export default Login
