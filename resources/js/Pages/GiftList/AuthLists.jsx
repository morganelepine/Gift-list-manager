import { Head, Link } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NoListCreated from "@/Components/User/EmptyList/NoListCreated";
import ShowPrivateCode from "@/Components/GiftList/Lists/ShowPrivateCode";

export default function AuthLists({ auth, lists }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="sm:flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Consulter et compléter mes listes
                    </h2>
                    {lists.length > 0 && (
                        <Link
                            as="button"
                            href={route("lists.create")}
                            className="flex items-center mt-2 sm:mt-0"
                        >
                            <div className="h-6 w-6 mr-1 bg-indigo-50 flex items-center justify-center rounded-full">
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
                            <p className="hover:text-indigo-500 text-indigo-800 text-sm">
                                Créer une liste
                            </p>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Mes listes" />

            <div className="max-w-4xl mx-auto pb-14 px-4 mt-6">
                {lists.length ? (
                    <div className="flex flex-wrap justify-center">
                        {lists.map((list) => (
                            <div
                                key={list.id}
                                className="p-5 mb-8 mx-10 flex flex-col border bg-white rounded-xl w-full sm:w-80"
                            >
                                <div className="flex items center justify-between">
                                    {/* LIST NAME */}
                                    <div className="">
                                        <p className="text-xl uppercase font-semibold text-gray-900 mr-4 mb-2">
                                            {list.name}
                                        </p>
                                    </div>

                                    {/* DELETE BUTTON */}
                                    <div className="group relative flex justify-center">
                                        {" "}
                                        <Link
                                            as="button"
                                            href={route(
                                                "lists.destroy",
                                                list.id
                                            )}
                                            method="delete"
                                        >
                                            <svg
                                                xmlns="https://www.w3.org/2000/svg"
                                                className="h-7 w-7 text-gray-300 hover:text-indigo-800"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </Link>
                                        <span className="absolute top-10 scale-0 transition-all rounded bg-indigo-800 p-2 text-xs text-center text-white group-hover:scale-100">
                                            Une fois supprimée, pas de retour en
                                            arrière !
                                        </span>
                                    </div>
                                </div>

                                {/* SEE BUTTON */}
                                <div>
                                    <Link
                                        as="button"
                                        href={route("lists.show", list.id)}
                                        className="flex items-center my-1"
                                    >
                                        <div className="h-8 w-8 mr-2 bg-indigo-50 flex items-center justify-center rounded-full">
                                            <svg
                                                xmlns="https://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <p className="hover:text-indigo-500">
                                            Consulter la liste
                                        </p>
                                    </Link>
                                </div>

                                {/* EDIT BUTTON */}
                                <div className="mt-2">
                                    <Link
                                        as="button"
                                        href={route(
                                            "ideas.create_idea",
                                            list.id
                                        )}
                                        className="flex items-center my-1"
                                    >
                                        <div className="h-8 w-8 mr-2 bg-indigo-50 flex items-center justify-center rounded-full">
                                            <svg
                                                xmlns="https://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </div>
                                        <p className="hover:text-indigo-500">
                                            Compléter la liste
                                        </p>
                                    </Link>
                                </div>

                                {/* PRIVATE CODE */}
                                <ShowPrivateCode list={list} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoListCreated />
                )}
            </div>
        </AuthenticatedLayout>
    );
}

AuthLists.propTypes = {
    auth: PropTypes.object.isRequired,
    lists: PropTypes.array,
};
