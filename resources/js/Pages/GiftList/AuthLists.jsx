import { Head, Link } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AuthListCard from "@/Components/User/AuthListCard";
import NoListCreated from "@/Components/User/EmptyList/NoListCreated";

export default function AuthLists({ auth, publicLists, privateLists }) {
    console.log({ publicLists });
    console.log({ privateLists });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="sm:flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Consulter et compléter mes listes
                    </h2>
                    {(publicLists.length > 0 || privateLists.length > 0) && (
                        <Link
                            as="button"
                            href={route("lists.create")}
                            className="flex items-center mt-2 sm:mt-0"
                        >
                            <div className="h-6 w-6 mr-1 bg-orange-50 flex items-center justify-center rounded-full">
                                <svg
                                    xmlns="https://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="hover:text-orange-500  text-sm">
                                Créer une liste
                            </p>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Mes listes" />

            <div className="max-w-6xl mx-auto px-4 sm:p-4">
                <div className="sm:mt-6 sm:flex justify-evenly pb-20">
                    <div className="flex flex-col items-center sm:w-80 mt-12 sm:mt-0">
                        <h1 className="text-xl text-center font-semibold mb-2">
                            Mes listes partagées
                        </h1>
                        {publicLists.length ? (
                            <div className="flex flex-wrap justify-center w-full">
                                {publicLists.map((list) => (
                                    <div
                                        key={list.id}
                                        className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full"
                                    >
                                        <AuthListCard list={list} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <NoListCreated listType="à partager" />
                        )}
                    </div>

                    <div className="flex flex-col items-center sm:w-80 mt-12 sm:mt-0">
                        <h1 className="text-xl text-center font-semibold mb-2">
                            Mes listes privées
                        </h1>
                        {privateLists.length ? (
                            <div className="flex flex-wrap justify-center w-full">
                                {privateLists.map((list) => (
                                    <div
                                        key={list.id}
                                        className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full"
                                    >
                                        <AuthListCard list={list} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <NoListCreated listType="privée" />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

AuthLists.propTypes = {
    auth: PropTypes.object.isRequired,
    publicLists: PropTypes.array,
    privateLists: PropTypes.array,
};
