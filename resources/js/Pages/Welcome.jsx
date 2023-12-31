import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    const link =
        "flex items-center text-center px-6 py-4 font-bold text-xl text-indigo-500 hover:text-indigo-700";

    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-wrap justify-center content-center min-h-screen">
                {auth.user ? (
                    <Link href={route("lists.index")} className={`${link}`}>
                        Bienvenue
                    </Link>
                ) : (
                    <>
                        <div className="flex items-center mx-8">
                            <Link
                                href={route("register")}
                                className={`${link}`}
                            >
                                <div className="h-12 w-12 bg-indigo-50 hover:indigo-indigo-500 dark:indigo-indigo-800/20 flex items-center justify-center rounded-full">
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        className="w-7 h-7 stroke-indigo-500 hover:stroke-white"
                                    >
                                        <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                </div>
                                <div className="ml-4">Inscription</div>
                            </Link>
                        </div>

                        <div className="flex items-center mx-8">
                            <Link href={route("login")} className={`${link}`}>
                                <div className="h-12 w-12 bg-indigo-50 hover:bg-indigo-500 dark:bg-indigo-800/20 flex items-center justify-center rounded-full">
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        className="w-7 h-7 stroke-indigo-500 hover:stroke-white"
                                    >
                                        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">Connexion</div>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
