import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-r from-bordeaux-100 to-orange-100">
            <div className="flex flex-col justify-center items-center">
                <Link href="/">
                    <h1 className="text-xl text-center font-yeseva bg-gradient-to-r from-orange-500 to-bordeaux-500 inline-block text-transparent bg-clip-text">
                        MerryMate
                    </h1>
                </Link>

                <div className="sm:max-w-md mt-6 mx-6 p-6 bg-white shadow-md rounded-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
