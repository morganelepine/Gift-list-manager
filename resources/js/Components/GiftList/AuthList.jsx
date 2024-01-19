import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListOfIdeas from "@/Components/GiftList/Ideas/All/ListOfIdeas";

export default function AuthList({ auth, list, ideas }) {
    console.log("ideas : ", ideas);

    const [sortBy, setSortBy] = useState("created_at");
    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="sm:flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Ma liste "{list.name}"
                    </h2>
                    {ideas.length > 0 && (
                        <Link
                            as="button"
                            href={route("ideas.create_idea", list.id)}
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
                                Compléter la liste
                            </p>
                        </Link>
                    )}
                </div>
            }
        >
            <div className="max-w-4xl mx-auto pt-4 pb-20 px-4">
                {/* <div className="space-x-5">
                    <button onClick={() => handleSortChange("price")}>
                        Trier par prix
                    </button>
                    <button onClick={() => handleSortChange("brand")}>
                        Trier par marque
                    </button>
                    <button onClick={() => handleSortChange("favorite")}>
                        Trier par coup de coeur
                    </button>
                </div> */}

                {ideas.length > 0 ? (
                    <div className="flex w-full">
                        <ListOfIdeas
                            key={list.id}
                            list={list}
                            ideas={ideas}
                            auth={auth}
                        />
                    </div>
                ) : (
                    <div className="mt-6 text-center">
                        <p>
                            Votre liste est vide. Cliquez sur ce bouton pour la
                            compléter :
                        </p>
                        <Link
                            as="button"
                            href={route("ideas.create_idea", list.id)}
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
