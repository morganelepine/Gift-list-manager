import { Link, Head } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function Welcome({ auth }) {
    const link =
        "flex items-center m-4 p-4 font-medium text-xl text-indigo-500 hover:text-indigo-700";
    const svg =
        "h-10 w-10 bg-gray-50 hover:bg-indigo-100 flex items-center justify-center rounded-full";

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-indigo-100 to-pink-100">
                <div className="flex flex-col sm:flex-row justify-center items-center">
                    {auth.user ? (
                        <Link href={route("lists.index")} className={`${link}`}>
                            Bienvenue
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("register")}
                                className={`${link}`}
                            >
                                <div className={`${svg}`}>
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        className="w-7 h-7 stroke-indigo-500 hover:stroke-indigo-900"
                                    >
                                        <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                </div>
                                <div className="ml-4">Inscription</div>
                            </Link>

                            <Link href={route("login")} className={`${link}`}>
                                <div className={`${svg}`}>
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        className="w-7 h-7 stroke-indigo-500 hover:stroke-indigo-900"
                                    >
                                        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">Connexion</div>
                            </Link>
                        </>
                    )}
                </div>

                <footer className="fixed bottom-0 left-0 w-full px-20 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 shadow-md text-gray-500 text-sm">
                    <div className="flex justify-center items-center font-medium">
                        <span className="">Fait avec</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 mx-1 fill-indigo-700"
                        >
                            <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
                        </svg>
                        <span className="">par Morgane Lu</span>
                    </div>

                    <ul className="flex flex-wrap justify-center items-center mt-3 sm:mt-0 space-x-3 sm:space-x-10">
                        <li>
                            <a
                                href="https://github.com/morganelepine"
                                target="_blank"
                                className="hover:text-indigo-700 font-medium"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/morgane-l%C3%A9pine-utter-a7bb5353/"
                                target="_blank"
                                className="hover:text-indigo-700 font-medium"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://morganelepine.github.io/"
                                target="_blank"
                                className="hover:text-indigo-700 font-medium"
                            >
                                Portfolio
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    );
}

Welcome.propTypes = {
    auth: PropTypes.object.isRequired,
};
