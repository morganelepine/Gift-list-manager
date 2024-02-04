import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListOfIdeas from "@/Components/GiftList/Ideas/All/ListOfIdeas";
import EditListTitle from "@/Components/GiftList/Lists/EditListTitle";

//-----------DISPLAY THIS PAGE WHEN THE AUTH USER ONLY HAVE ONE LIST IN DB

export default function AuthList({ auth, list, ideas }) {
    // console.log("list[0].id : ", list[0].id);

    const [editing, setEditing] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        {editing ? (
                            <EditListTitle
                                list={list}
                                setEditing={setEditing}
                            />
                        ) : (
                            <>
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight mr-3">
                                    Ma liste "{list[0].name}"
                                </h2>
                                <button onClick={() => setEditing(true)}>
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400 hover:text-indigo-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                    {ideas.length > 0 && (
                        <div className="flex flex-wrap mt-2 sm:mt-0">
                            <Link
                                as="button"
                                href={route("ideas.create_idea", list[0].id)}
                                className="flex items-center mr-5"
                            >
                                <div className="h-6 w-6 mr-1 bg-indigo-50 flex items-center justify-center rounded-full">
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </div>
                                <p className="hover:text-indigo-500 text-indigo-800 text-sm">
                                    Compléter la liste
                                </p>
                            </Link>
                            <Link
                                as="button"
                                href={route("lists.create")}
                                className="flex items-center"
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
                        </div>
                    )}
                </div>
            }
        >
            <div className="max-w-4xl mx-auto pb-14 px-4 mt-6">
                {ideas.length > 0 ? (
                    <div className="flex w-full" key={list[0].id}>
                        <ListOfIdeas list={list} ideas={ideas} auth={auth} />
                    </div>
                ) : (
                    <div className="text-center">
                        <p>
                            Votre liste est vide. Cliquez sur ce bouton pour la
                            compléter :
                        </p>
                        <Link
                            as="button"
                            href={route("ideas.create_idea", list[0].id)}
                            className="inline-block text-center mt-2 px-3 py-1 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Commencer la liste
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

AuthList.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    ideas: PropTypes.array,
};
