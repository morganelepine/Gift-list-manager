import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Index from "@/Pages/Users/Index";

export default function Dashboard({ auth }) {
    const firstButton =
        "text-center px-6 py-4 bg-indigo-800 border border-transparent rounded-md font-bold text-xl text-white uppercase tracking-widest hover:bg-indigo-900 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150";
    const secondButton =
        "text-center mt-4 px-4 py-2 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bienvenue
                </h2>
            }
        >
            <Head title="Bienvenue" />

            <div className="flex justify-center py-12">
                <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    <div className="flex flex-col">
                        <Link
                            href={route("ideas.index")}
                            // active={route().current("ideas.index")}
                            className={`${firstButton}`}
                        >
                            Ma liste
                        </Link>
                        <Link
                            href={route("ideas.index")}
                            // active={route().current("ideas.index")}
                            className={`${secondButton}`}
                        >
                            Voir ma liste
                        </Link>
                        <Link
                            href={route("ideas.create")}
                            // active={route().current("ideas.create")}
                            className={`${secondButton}`}
                        >
                            Compléter ma liste
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <Link
                            href={route("ideas.index")}
                            // active={route().current("ideas.index")}
                            className={`${firstButton}`}
                        >
                            Mes listes suivies
                        </Link>
                        <Link
                            href={route("ideas.index")}
                            // active={route().current("ideas.index")}
                            className={`${secondButton}`}
                        >
                            Morgane
                        </Link>
                        <Link
                            href={route("ideas.index")}
                            // active={route().current("ideas.index")}
                            className={`${secondButton}`}
                        >
                            Roxane
                        </Link>
                        <Link
                            href={route("ideas.index")}
                            // active={route().current("ideas.index")}
                            className={`${secondButton}`}
                        >
                            Arthur
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
