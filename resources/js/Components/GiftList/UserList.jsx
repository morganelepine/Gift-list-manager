import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import ListOfIdeas from "@/Components/GiftList/Ideas/All/ListOfIdeas";
import IdeasAvailable from "@/Components/GiftList/Ideas/Available/Ideas_available";
import IdeasReserved from "@/Components/GiftList/Ideas/Reserved/Ideas_reserved";
import IdeasPurchased from "@/Components/GiftList/Ideas/Purchased/Ideas_purchased";

export default function UserList({
    auth,
    list,
    // ideas,
    ideas_available,
    ideas_reserved,
    ideas_purchased,
}) {
    // console.log("followedList : ", followedList);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        La liste "{list.name}" de {list.user_name}
                    </h2>
                </div>
            }
        >
            <Head title="Ma liste" />

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="flex items-center justify-center">
                    <IdeasAvailable
                        key={list.id}
                        list={list}
                        ideas={ideas_available}
                        auth={auth}
                    />
                </div>
            </div>

            <hr className="my-10"></hr>

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="p-4 flex flex-col justify-center bg-white shadow-sm rounded-lg">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-1 w-full">
                        Réservé
                    </h1>
                    <div className="flex items-center mb-3 text-gray-500 italic">
                        <small className="text-xs mr-1">
                            Pour annuler ta réservation, clique sur le picto
                        </small>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4 cursor-pointer"
                        >
                            <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <IdeasReserved
                            key={list.id}
                            list={list}
                            ideas={ideas_reserved}
                            auth={auth}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="p-4 flex flex-col justify-center bg-white shadow-sm rounded-lg">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-1 w-full">
                        Acheté
                    </h1>
                    <div className="flex items-center mb-3 text-gray-500 italic">
                        <small className="text-xs mr-1">
                            Pour annuler ton achat, clique sur le picto
                        </small>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <IdeasPurchased
                            key={list.id}
                            list={list}
                            ideas={ideas_purchased}
                            auth={auth}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

UserList.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    // ideas: PropTypes.array,
};
