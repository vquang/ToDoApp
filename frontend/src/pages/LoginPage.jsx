
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import * as userService from '../service/UserService'
import img from '../assets/login.jfif';

const LoginPage = () => {
    // state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState({
        'username': false,
        'password': false
    });
    const navigate = useNavigate();

    // handle
    const handleUsernameChange = (even) => setUsername(even.target.value);
    const handlePasswordChange = (even) => setPassword(even.target.value);
    const isValid = () => {
        let isOk = true;
        if (!username) {
            setIsError(pre => ({ ...pre, 'username': true }));
            isOk = false;
        } else setIsError(pre => ({ ...pre, 'username': false }));
        if (!password) {
            setIsError(pre => ({ ...pre, 'password': true }));
            isOk = false;
        } else setIsError(pre => ({ ...pre, 'password': false }));
        return isOk;
    }
    const handleSubmit = () => {
        fetchApiLogin({ username, password });
    }
    const errorNotify = () => toast.error("Authentication failed!", {
        position: "top-right"
    });

    // effect
    useEffect(() => {
        if(localStorage.getItem('token'))
            navigate("/");
    }, []);

    // api
    const fetchApiLogin = async ({ username, password }) => {
        if (!isValid()) return;
        const data = await userService.login({ "username": username, "password": password }, errorNotify);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        setUsername('');
        setPassword('');
        navigate("/");
    }


    return (
        <div className='flex w-1/2 m-auto mt-14
        shadow-md shadow-sky-900'>
            <ToastContainer autoClose={1000} />
            <img className='w-1/2'
                src={img} />
            <form className='w-1/2 flex flex-col items-center gap-6 p-5'
            onSubmit={(event) => event.preventDefault()}>
                <h1 className='text-2xl text-sky-900 font-bold'>Login Page</h1>
                <div className='flex flex-col w-full'>
                    <label className='text-sky-900 font-bold'
                        htmlFor='username'
                    >Username:</label>
                    <input className={`p-2 outline-none border-b-2 border-sky-900 text-sky-900
                    focus:shadow-md focus:shadow-sky-400
                    ${isError.username && 'border-b-red-400'}`}
                        id='username'
                        type='text' placeholder='username...'
                        value={username}
                        onChange={handleUsernameChange} />
                    {isError.username && <div className='text-red-400'>Please fill out this field.</div>}
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-sky-900 font-bold'
                        htmlFor='password'
                    >Password:</label>
                    <input className={`p-2 outline-none border-b-2 border-sky-900 text-sky-900
                    focus:shadow-md focus:shadow-sky-400
                    ${isError.password && 'border-b-red-400'}`}
                        id='password'
                        type='password' placeholder='password...'
                        value={password}
                        onChange={handlePasswordChange} />
                    {isError.password && <div className='text-red-400'>Please fill out this field.</div>}
                </div>
                <button className='w-full p-2 bg-sky-900
                text-sky-50 font-bold text-lg
                hover:bg-sky-200 hover:text-sky-900 hover:shadow-inner hover:shadow-sky-900'
                    type='button'
                    onClick={handleSubmit}
                >Login</button>
                <div className='w-full'>
                    <Link className='text-red-500'
                        to='/register'>register?</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;