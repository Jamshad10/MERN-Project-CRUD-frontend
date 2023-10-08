import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, deleteUser } from '../redux/userSlice';

const Users = () => {

    const [image,setImage] = useState();

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000');
                dispatch(getUser(response.data));
                setImage(response.data[0].image)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:8000/delete/' + id)
            .then(res => {
                dispatch(deleteUser({id}));
                console.log(res);
            }).then(err => console.log(err))
    }

    return (
        <div className="w-9/12 ml-40 mt-20 relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-6 flex items-center justify-between py-4 bg-white dark:bg-gray-800">

                <label for="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                </div>
                <Link to={'/add'}>
                    <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                        Add +
                    </button>
                </Link>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Age
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full"
                                     src={'http://localhost:8000/images/'+ user.image}
                                     alt="user image"
                                      />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{user.name}</div>
                                        <div className="font-normal text-gray-500">{user.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {user.age}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/edit/${user.id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                            Edit
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(user.id)} className=" ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
        </div>

    )
}

export default Users