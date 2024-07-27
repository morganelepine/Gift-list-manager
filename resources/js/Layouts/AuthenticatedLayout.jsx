import { useState, useEffect } from "react";
// import ApplicationLogo from "@/Components/Laravel/ApplicationLogo";
import Dropdown from "@/Components/Utils/Dropdown";
import NavLink from "@/Components/Utils/NavLink";
import ResponsiveNavLink from "@/Components/Utils/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const fetchUnreadNotifications = async () => {
        try {
            const response = await fetch("/notifications-unread");
            const data = await response.json();
            setUnreadNotifications(data.unread_notifications);
        } catch (error) {
            console.error("Error fetching unread notifications: ", error);
        }
    };

    useEffect(() => {
        fetchUnreadNotifications();
    }, []);

    return (
        <div className="min-h-screen bg-lavande-20">
            <nav className="sticky top-0 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route("lists.index")}>
                                    <h1 className="text-xl text-center font-yeseva bg-gradient-to-r from-orange-500 to-bordeaux-500 inline-block text-transparent bg-clip-text">
                                        MerryMate
                                    </h1>
                                    {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" /> */}
                                </Link>
                            </div>

                            <div className="hidden space-x-8 lg:-my-px lg:ml-10 lg:flex">
                                <div className="hidden lg:flex lg:items-center">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center pl-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="w-5 h-5 mr-1"
                                                    >
                                                        <path d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    </svg>
                                                    Listes
                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="https://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("lists.authLists")}
                                            >
                                                Mes listes
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route(
                                                    "lists.followedLists"
                                                )}
                                            >
                                                Mes listes suivies
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>

                                <NavLink
                                    href={route("lists.listsToFollow")}
                                    active={route().current(
                                        "lists.listsToFollow"
                                    )}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-1"
                                    >
                                        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                    Chercher
                                </NavLink>

                                <NavLink
                                    href={route("lists.create")}
                                    active={route().current("lists.create")}
                                >
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-1"
                                    >
                                        <path d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Créer
                                </NavLink>

                                <NavLink
                                    href={route("profile.purchase")}
                                    active={route().current("profile.purchase")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-1"
                                    >
                                        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                    </svg>
                                    Budget
                                </NavLink>

                                <NavLink
                                    href={route("profile.notifications")}
                                    active={route().current(
                                        "profile.notifications"
                                    )}
                                >
                                    {unreadNotifications.length > 0 ? (
                                        <div className="flex">
                                            <div className="relative">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-5 h-5 mr-1 text-orange-500"
                                                >
                                                    <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                                </svg>
                                                <span className="absolute text-orange-500 -top-2 -right-0 text-2xs font-extrabold">
                                                    {unreadNotifications.length}
                                                </span>
                                            </div>
                                            <p className="ml-1">
                                                Notifications
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-5 h-5 mr-1"
                                            >
                                                <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                            </svg>
                                            Notifications
                                        </div>
                                    )}
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden lg:flex lg:items-center lg:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center pl-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="https://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Mon profil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Déconnexion
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center lg:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " lg:hidden"
                    }
                >
                    <div className="py-2">
                        <ResponsiveNavLink
                            href={route("lists.authLists")}
                            active={route().current("lists.authLists")}
                        >
                            Mes listes
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("lists.followedLists")}
                            active={route().current("lists.followedLists")}
                        >
                            Les listes suivies
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("lists.listsToFollow")}
                            active={route().current("lists.listsToFollow")}
                        >
                            Chercher une liste
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("lists.create")}
                            active={route().current("lists.create")}
                            className="flex items-center"
                        >
                            Créer une liste
                        </ResponsiveNavLink>
                    </div>

                    <div className="py-2 border-t border-gray-200">
                        <div className="">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("profile.purchase")}>
                                Budget
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("profile.notifications")}
                                active={route().current(
                                    "profile.notifications"
                                )}
                                className="flex items-center"
                            >
                                Notifications
                                {unreadNotifications.length > 0 && (
                                    <span className="text-center w-4 h-4 ml-2 rounded-full bg-orange-500 text-white text-xs font-semibold">
                                        {unreadNotifications.length}
                                    </span>
                                )}
                            </ResponsiveNavLink>
                        </div>
                        <div className="py-2 border-t border-gray-200">
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Déconnexion
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
