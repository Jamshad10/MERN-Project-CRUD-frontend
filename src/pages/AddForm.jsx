import React, { useState } from 'react';
import axios from 'axios';
import { addUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AddForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [file, setFile] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('age', age)
        axios.post('http://localhost:8000/add', formData)
            .then(res => {
                dispatch(addUser(res.data));
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err))
    };

    return (
        <div className='mt-20 flex justify-center'>
            <form className='w-96 border-2 rounded-lg p-6 shadow-md' onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Your Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@flowbite.com"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">
                        Your Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
                        Your Age
                    </label>
                    <input
                        type="text"
                        name="age"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">
                        Choose file
                    </label>
                    <input
                        type="file"
                        name="file"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add User
                </button>
            </form>

        </div>
    )
}

export default AddForm;