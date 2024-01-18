import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import { HandleLogin } from "../../events/axiosGlobal";import { useNavigate } from "react-router-dom";

export default function Login() {
    const [showModal, setShowModal] = React.useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const location = useNavigate(); //the old version was using LOCATION in react. In the new version, NAVIGATE is used. can be controlled
    const HandleLogin = async (data) => {
        try {
            const response = await axios.post("/user/login", data);
            const resData = response.data;
            console.log(response, "login post request");

            Cookies.set("email", resData.email, { path: "/" });
            Cookies.set("id", resData.id, { path: "/" });
            document.cookie = `token=${resData.token}`;
            // document.cookie = `email=${resData.email}`

            location("/dashboard");
        } catch (err) {
            // const errStatus = err.response.status;
            console.log(err.message)
        }
    };
    const onSubmit = async (data = {}) => {
        if (data.email === 'user@example.com' && data.password === 'password') {
            // login successful
        } else {
            setError('email', { type: 'manual', message: 'Invalid email or password' });
            setError('password', { type: 'manual', message: 'Invalid email or password' });
        }
        HandleLogin(data);
    };

    return (
        <div className="container mx-auto">
            <button
                className="justify-center items-center flex bg-cyan-900 text-white active:bg-pink-600 font-logoFont uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none  mr-1 mb-1  transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Login
            </button>
            {!showModal ? null : (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none "
                onClick={() => {setShowModal(false)}}>
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*Content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none"
                        onClick={(e) => {e.stopPropagation()}}
                        >
                            {/*Body*/}
                            <div className="relative p-6 flex-auto">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-logoFont text-gray-900 ">
                                            E-mail address as
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-lightcream ${errors.email ? 'error' : ''} `}
                                            {...register("email", { required: true })}
                                            placeholder="Add E-mail"

                                        />
                                        {errors.email && errors.email.type === 'required' && (<span style={{ color: 'red' }}>This field is required a valid input</span>)}
                                        {errors.email && errors.email.type === 'manual' && (<span style={{ color: 'red' }}>{errors.email.message}</span>)}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-logoFont text-gray-900 ">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className={`shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-lightcream ${errors.password ? 'error' : ''}`}
                                            {...register("password", { required: true })}
                                            placeholder="Add Password"
                                        />
                                        {errors.password && errors.password.type === 'required' && (<span style={{ color: 'red' }}>This field is required a valid input</span>)}
                                        {errors.password && errors.password.type === 'manual' && (<span style={{ color: 'red' }}>{errors.password.message}</span>)}
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-logoFont uppercase px-6 py-2 text-sm outline-none "
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-cyan-900 text-white active:bg-emerald-600 font-logoFont uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1 transition-all duration-150 "
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
