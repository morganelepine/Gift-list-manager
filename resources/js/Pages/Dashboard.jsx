import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import NavLink from "@/Components/Laravel/NavLink";

export default function Dashboard({ auth }) {
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
                <div className="space-x-8 sm:-my-px sm:ml-10 flex flex-col">
                    <div>
                        <Link
                            href={route("lists.create")}
                            active={route().current("lists.create")}
                            className="text-indigo-700 flex items-center"
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
                            Créer une liste
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={route("lists.index")}
                            active={route().current("lists.index")}
                            className="text-indigo-700 flex items-center"
                        >
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5 mr-1"
                            >
                                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Voir mes listes
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
