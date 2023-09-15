import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
    Routes,
    Route,
    Navigate,
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

// assets
import Person from "../assets/images/avatar.svg";
import BellIcon from "../assets/images/BellIcon.svg";
import leadimage from "../assets/images/leadimage.svg";
import DuvetLogo from "../assets/images/DuvetLogo.svg";
import leadsActive from "../assets/images/leadsActive.svg";
import duvetLogoOpen from "../assets/images/duvetlogoOpen.svg";
import NavFooterImage from "../assets/images/NavFooterImage.svg";

import ResetPassword from "../components/Pages/Auth/ResetPassword";
import ForgotPassword from "../components/Pages/Auth/ForgotPassword";

import { uuid } from "../utils/helpers";
import { getLoggedInUser, isUserLoggedIn, logout } from "../utils/auth";

import NotFound from "../components/PageNotFound";
import Login from "../components/Pages/Auth/Login";
import UnAuthorizedAccess from "../components/UnAuthorizedAccess";
import CreatePassword from "../components/Pages/Auth/CreatePassword";

import settings from "../assets/icons/SidebarIcons/settings.svg";
import settingsActive from "../assets/icons/SidebarIcons/settingsActive.svg";
import menuOpenClose from "../assets/images/menuOpenClose.svg";

import Features from "../components/Pages/Features/Features";
import AllComponents from "../components/Pages/AllComponents/AllComponents";
import AllComponents2 from "../components/Pages/AllComponents2.tsx/AllComponents2";
import AllComponents3 from "../components/Pages/AllComponents/AllComponents3/AllComponents3";
import Test from "../components/Pages/Test/Test";

type Children = {
    children: any;
};
type PrivateRouteProps = {
    children: any;
    module: string;
};

function useOutsideAlerter(ref: any, callback: any) {
    useEffect(() => {
        /**
         * clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const RestrictedRoute = ({ children }: Children) => {
    const auth = isUserLoggedIn();
    return !auth ? children : <Navigate to="/dashboard" />;
};

const PrivateRoute = ({ children, module }: PrivateRouteProps) => {
    const auth = isUserLoggedIn();
    const [isSidebarOpen, setMenuOpen] = useState(true);

    if (!auth) {
        return <Navigate to="/login" />;
    }
    let user: any = {
        name: "",
        email: "",
    };
    const loggedUser = getLoggedInUser();

    if (loggedUser) {
        user = loggedUser;
    }
    const [, setOpenMenuIndex] = useState(0);
    const location = useLocation();
    const [showUserInfo, setUserInfo] = React.useState(false);
    const navigate = useNavigate();
    const wrapperInfoRef = useRef(null);
    useOutsideAlerter(wrapperInfoRef, setUserInfo);

    const handleMouseEnter = () => {
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setMenuOpen(false);
    };

    function toggleUserInfo() {
        if (showUserInfo) {
            return setUserInfo(false);
        }
        setUserInfo(true);
        return true;
    }

    function logoutUser() {
        localStorage.clear();
        logout();
        navigate("/login");
    }

    const { pathname } = location;
    const splitLocation = pathname.split("/");

    console.log(pathname, "pathname");

    const SYSTEM_ROUTES = [
        {
            name: "Components",
            icon: leadimage,
            active_icon: leadsActive,
            sub_menus: [],
            index: 1,
            url: "/components",
            module: "components",
        },
        {
            name: "Components2",
            icon: leadimage,
            active_icon: leadsActive,
            sub_menus: [],
            index: 1,
            url: "/components2",
            module: "components2",
        },
        {
            name: "Components3",
            icon: leadimage,
            active_icon: leadsActive,
            sub_menus: [],
            index: 1,
            url: "/components3",
            module: "components3",
        },
        {
            name: "Test",
            icon: leadimage,
            active_icon: leadsActive,
            sub_menus: [],
            index: 1,
            url: "/test",
            module: "test",
        },
        {
            name: "Features",
            icon: settings,
            active_icon: settingsActive,
            sub_menus: [],
            index: 2,
            url: "/features",
            module: "features",
        },
    ];

    const ROUTES = SYSTEM_ROUTES;

    return auth ? (
        <div className="flex h-screen overflow-y-hidden text-white bg-white">
            <aside
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-60 border-r
                max-h-screen overflow-hidden transition-all transform gradient-aside border-r-darkGray
                shadow-lg lg:z-auto lg:static lg:shadow-none ${
                    !isSidebarOpen
                        ? "-translate-x-full lg:translate-x-0 lg:w-20 bg-[#3A5A40]"
                        : ""
                }`}
            >
                <div
                    className={`flex  flex-shrink-0 p-2 ${
                        !isSidebarOpen ? "lg:justify-center" : ""
                    }`}
                >
                    <span className="flex  gap-6 p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
                        {/* {isSidebarOpen ? (
                            <img
                                src={duvetLogoOpen}
                                alt="all_logos"
                                className="w-2/3 m-auto"
                            />
                        ) : (
                            <img src={DuvetLogo} alt="logo" />
                        )} */}
                    </span>
                    <button
                        type="button"
                        className="p-2 rounded-md lg:hidden"
                        onClick={() => setMenuOpen(!isSidebarOpen)}
                    >
                        <svg
                            className="w-6 h-6 text-SpaceCadet"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="flex-1 mt-3 overflow-auto">
                    <ul className="p-2 ">
                        {React.Children.toArray(
                            ROUTES.map((x: any) => (
                                <li
                                    className={`pb-2 menu ${
                                        x.sub_menus.length && isSidebarOpen
                                            ? "is-sub-menu"
                                            : ""
                                    }
               ${
                   x.url && splitLocation.includes(x.module)
                       ? "active-link"
                       : ""
               }`}
                                    onClick={() =>
                                        x.sub_menus.length &&
                                        isSidebarOpen &&
                                        setOpenMenuIndex(x.index)
                                    }
                                >
                                    <Link
                                        to={`${x.url}`}
                                        className={`flex items-center py-2 px-4  space-x-4 rounded-md  ${
                                            !isSidebarOpen
                                                ? "justify-center"
                                                : ""
                                        }`}
                                    >
                                        <span>
                                            <img
                                                src={`${
                                                    x.module &&
                                                    splitLocation.includes(
                                                        x.module
                                                    )
                                                        ? x.active_icon
                                                        : x.icon
                                                }`}
                                                alt={x.icon}
                                            />
                                        </span>
                                        <span
                                            className={`${
                                                !isSidebarOpen
                                                    ? "lg:hidden"
                                                    : ""
                                            }`}
                                        >
                                            {x.name}
                                        </span>
                                    </Link>
                                    {x.sub_menus.length &&
                                    isSidebarOpen &&
                                    splitLocation.includes(x.module) ? (
                                        <ul className="pt-2 submenu ">
                                            {x.sub_menus.map((y: any) => (
                                                <li
                                                    key={uuid()}
                                                    className={`${
                                                        splitLocation.includes(
                                                            y.sub_module
                                                        )
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                >
                                                    <Link to={`/${y.url}`}>
                                                        <a>
                                                            <span>
                                                                {y.name}
                                                            </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        ""
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </nav>
                <div className="flex-shrink-0 p-2 max-h-14">
                    <div
                        className={`flex items-center justify-center w-full   space-x-1 ${
                            !isSidebarOpen ? "flex-col" : ""
                        }`}
                    >
                        <img
                            className=" mb-2"
                            src={NavFooterImage}
                            alt="scube_logo"
                        />
                    </div>
                </div>
            </aside>

            <div className="flex flex-col flex-1 h-full overflow-hidden">
                <header className="flex-shrink-0">
                    <div className="flex items-center justify-between p-2 border-b border-Geyser">
                        <div>
                            <div className="cursor-pointer ml-3 block md:hidden">
                                <img
                                    onClick={() => setMenuOpen(!isSidebarOpen)}
                                    src={menuOpenClose}
                                    alt="isSidebaricon"
                                />
                            </div>
                        </div>

                        <div className="relative flex items-center space-x-3 sm:pr-3 sm:mr-4">
                            <div
                                className="relative flex items-center justify-between gap-4 "
                                ref={wrapperInfoRef}
                            >
                                <p className="font-bold text-SpaceCadet">
                                    Hi {""}
                                    {user?.name}
                                </p>

                                <div className="relative ">
                                    <svg
                                        className="cursor-pointer"
                                        onClick={() => toggleUserInfo()}
                                        width="16"
                                        height="18"
                                        viewBox="0 0 10 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 0.881894L5 5.11719L9 0.881894"
                                            stroke="#141C4C"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <div
                                        className={`absolute w-44  top-3 left-8  user-login-info  mt-3 transform -translate-x-full layout-menu rounded-md shadow-lg ${
                                            showUserInfo ? "block" : "hidden"
                                        } `}
                                    >
                                        <ul className="flex flex-col p-2 my-2 space-y-1 text-SpaceCadet">
                                            <li>
                                                <Link
                                                    className="block px-2 py-1 font-bold transition rounded-md cursor-pointer "
                                                    to={`/users/view/${user.id}`}
                                                >
                                                    My Profile
                                                </Link>
                                            </li>
                                        </ul>
                                        <div
                                            onClick={() => logoutUser()}
                                            className="flex items-center justify-between p-4 font-bold border-t cursor-pointer text-SpaceCadet border-t-line"
                                        >
                                            <p>Logout</p>
                                            <svg
                                                width="17"
                                                height="16"
                                                viewBox="0 0 17 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.2611 4.54162V3.84187C10.2611 2.31562 9.02363 1.07812 7.49738 1.07812H3.84113C2.31563 1.07812 1.07812 2.31562 1.07812 3.84187V12.1894C1.07812 13.7156 2.31563 14.9531 3.84113 14.9531H7.50488C9.02663 14.9531 10.2611 13.7194 10.2611 12.1976V11.4904"
                                                    stroke="#151929"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M15.5307 8.375H6.5"
                                                    stroke="#151929"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M13.1602 5.82812L15.3562 8.01437L13.1602 10.2014"
                                                    stroke="#151929"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 max-h-full p-2 overflow-hidden overflow-y-scroll lg:p-5 text-SpaceCadet bg-CalmWaters">
                    {children}
                </main>
            </div>
        </div>
    ) : (
        <Navigate to="/un-authorized" />
    );
};

export const Layout = () => (
    // <div className='relative z-[9999]'>
    <div className="relative z-[89] ">
        <Suspense fallback={<h1 className="loader"> Loading....</h1>}>
            <Routes>
                <Route path="/" element={<Navigate to="/components" />} />

                <Route
                    path="/components"
                    element={
                        <PrivateRoute module="">
                            <AllComponents />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/components2"
                    element={
                        <PrivateRoute module="">
                            <AllComponents2 />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/components3"
                    element={
                        <PrivateRoute module="">
                            <AllComponents3 />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/test"
                    element={
                        <PrivateRoute module="">
                            <Test />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/features"
                    element={
                        <PrivateRoute module="">
                            <Features />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
                <Route path="un-authorized" element={<UnAuthorizedAccess />} />
            </Routes>
        </Suspense>
    </div>
);
