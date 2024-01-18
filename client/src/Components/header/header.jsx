// import KUTE from 'kute.js'

// const tween = KUTE.fromTo(
//     '#head1',
//     { path: '#head1' },
//     { path: '#head2' },
//     { repeat: 999, duration: 3000, yoyo: true }
// );
// tween.start()

import { useLocation } from "react-router-dom";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import Login from "../forms/Login";
import Register from "../forms/Registration";
// import logo from "../assets/tudu.png"



const HeaderStyle = () => {
    // const navigate = useNavigate();

    return (

        <div className=' min-h-20 w-full absolute top-0 left-0'>
            <div className="hidden md:block wave h-26">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <linearGradient
                        id="gradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%" >
                        <stop offset="0%" stopColor="#45BCB7" stopOpacity=".3" />
                        <stop offset="20%" stopColor="#064566" stopOpacity=".3" />
                        <stop offset="25%" stopColor="#1C373F" stopOpacity=".3" />
                        <stop offset="50%" stopColor="#DE3F4D" stopOpacity=".3" />
                        <stop offset="75%" stopColor="#733C47" stopOpacity=".3" />
                        <stop offset="100%" stopColor="#733C47" stopOpacity=".3" />
                    </linearGradient>

                    <path id="head1" d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="url(#gradient)" />
                    <path id="head2" d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" transform="scale(-1, 1) translate(-700, 0)" fill="url(#gradient)" visibility='hidden' />
                </svg>
            </div>
            <div className="flex items-center justify-between p-4">
                <div className="flex justify-end w-screen">

                    <button
                        data-drawer-target="default-sidebar"
                        data-drawer-toggle="default-sidebar"
                        aria-controls="default-sidebar"
                        type="button"
                        className="inline-flex items-center mr-4 p-4
                         text-sm text-secondary rounded-lg md:hidden hover:bg-secondaryVariant focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3BottomLeftIcon className="w-6 h-6 text-secondary" />
                    </button>
                </div>
                <div className=" items-center ml-3 hidden md:flex">
                    <div className="container mx-auto flex justify-end z-50">
                        <Login />
                        <Register />
                    </div>
                </div>
            </div>
        </div>

    );
};

const Header = () => {
    const location = useLocation();

    if (location.pathname === "/" || location.pathname === "/login") {
        return <HeaderStyle />;
    }
};

export default Header;

