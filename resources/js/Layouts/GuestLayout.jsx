import ApplicationLogo from "@/Components/Laravel/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-r from-indigo-100 to-pink-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="sm:max-w-md m-6 p-6 bg-white shadow-md rounded-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
