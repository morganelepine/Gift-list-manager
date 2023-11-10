import React from "react";
import PropTypes from "prop-types";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListOfIdeas from "@/Components/GiftList/ListOfIdeas";

export default function Show({ auth, list, ideas }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Ma liste : {list.name}
                        </h2>
                        {/* EDIT BUTTON */}
                        <Link
                            as="button"
                            href={route("ideas.create_idea", list.id)}
                            className="flex items-center my-1"
                        >
                            <div className="h-7 w-7 mr-2 bg-indigo-50 flex items-center justify-center rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
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
                    </div>
                </>
            }
        >
            <Head title="Ma liste" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="my-1 flex items-center justify-center">
                    <ListOfIdeas
                        // key={idea.id}
                        ideas={ideas}
                        auth={auth}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Show.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    ideas: PropTypes.array,
};
