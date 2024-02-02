import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function LoginRegister({ auth }) {
    const link =
        "flex items-center m-2 p-2 font-medium text-indigo-500 hover:text-indigo-700";
    const svgDiv =
        "h-8 w-8 bg-gray-50 hover:bg-indigo-100 flex items-center justify-center rounded-full";

    const svg = "w-6 h-6 stroke-indigo-500 hover:stroke-indigo-900";

    return (
        <div className="flex sm:self-end sm:px-20">
            <Link href={route("register")} className={`${link}`}>
                <div className={`${svgDiv}`}>
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        className={`${svg}`}
                    >
                        <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                </div>
                <div className="ml-2">Inscription</div>
            </Link>

            <Link href={route("login")} className={`${link}`}>
                <div className={`${svgDiv}`}>
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        className={`${svg}`}
                    >
                        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="ml-2">Connexion</div>
            </Link>
        </div>
    );
}

LoginRegister.propTypes = {
    auth: PropTypes.object.isRequired,
};
