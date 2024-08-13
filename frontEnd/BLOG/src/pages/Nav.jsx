import React, { useState } from 'react'
import { DrawerDefault } from './DrawerDefault';

// function Nav() {
//     const [active, setActive] = useState("Home");
//     return (
//         <>
//             <div className='w-full bg-[#000000] sticky top-0 z-50'>
//                 <ul className='flex w-full  h-25 text-normal pl-6 p-2 text-2xl'>
//                     <li className='mr-16'><DrawerDefault /></li>
//                     <li onClick={() => {
//                         console.log(active);
//                         setActive("Home");
//                     }} className={`mr-12  hover:cursor-pointer px-2 py-1  ${active == "Home" ? " text-red-600 rounded-lg" : "text-white "}`} >Home</li>
//                     <li onClick={() => setActive("createPost")} className={`  hover:cursor-pointer mr-12 px-2 py-1  ${active == "createPost" ? " text-red-600 rounded-lg" : "text-white "}`}>Create Post</li>
//                     <li
//                         onClick={() => setActive("logout")} className={`  hover:cursor-pointer px-2 py-1 float-end mr-12  ${active == "logout" ? " text-red-600 rounded-lg" : "text-white "}`}

//                     >Log out</li>
//                 </ul>

//             </div>
//         </>
//     )
// }

// export default Nav
// import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const navigate = useNavigate();
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const handleLogout = async () => {
        const res = await fetch("http://localhost:8080/api/logout", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }

        });
        const data = await res.json();
        console.log(data);
        navigate("/");
    }

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Blogs
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/createPost" className="flex items-center">
                    Create Post
                </a>
            </Typography>
            {/* <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Blocks
                </a>
            </Typography> */}
            {/* <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Docs
                </a>
            </Typography> */}
        </ul>
    );

    return (<>
        {/* <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">


        </div> */}

        <Navbar className="sticky top-0  h-max max-w-full z-10 rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4  cursor-pointer py-1.5 font-medium"
                >

                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-x-1">
                        {/* <Button
                            variant="text"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Log In</span>
                        </Button> */}
                        <Button
                            onClick={handleLogout}
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Log Out</span>
                        </Button>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={openNav}>
                {navList}
                <div className="flex items-center gap-x-1">
                    {/* <Button fullWidth variant="text" size="sm" className="">
                        <span>Log Out</span>
                    </Button> */}
                    <Button fullWidth variant="gradient" size="sm" className="">
                        <span>Log Out</span>
                    </Button>
                </div>
            </MobileNav>
        </Navbar>
    </>
    );
}

export default StickyNavbar;