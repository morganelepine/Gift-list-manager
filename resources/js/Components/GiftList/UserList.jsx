import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import IdeasAvailable from "@/Components/GiftList/Ideas/Available/Ideas_available";
import IdeasReserved from "@/Components/GiftList/Ideas/Reserved/Ideas_reserved";
import IdeasPurchased from "@/Components/GiftList/Ideas/Purchased/Ideas_purchased";

export default function UserList({
    auth,
    list,
    ideas_available,
    ideas_reserved,
    ideas_purchased,
}) {
    // console.log("followedList : ", followedList);

    // Regrouper les idées par marque
    const groupedIdeas = ideas_available.reduce((ideasByBrand, idea) => {
        const { brand, ...rest } = idea;

        if (!ideasByBrand[brand]) {
            ideasByBrand[brand] = { brand, ideas_available: [rest] };
        } else {
            ideasByBrand[brand].ideas_available.push(rest);
        }

        return ideasByBrand;
    }, {});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        La liste "{list.name}" de {list.user_name}
                    </h2>
                    <div className="hidden sm:flex">
                        <div className="flex items-center justify-end text-xs hover:text-indigo-700 ml-3">
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                            <p className="mr-1">Réserver</p>
                        </div>
                        <div className="flex items-center justify-end text-xs hover:text-indigo-700 ml-3">
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <p className="mr-1">Acheter</p>
                        </div>
                        <div className="flex items-center justify-end text-xs hover:text-indigo-700 ml-3">
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            <p className="mr-1">Annuler</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Ma liste" />

            <div className="max-w-3xl mx-auto space-y-10 mt-8 pb-20 px-4">
                {ideas_available.length == 0 &&
                    ideas_reserved.length == 0 &&
                    ideas_purchased.length == 0 && (
                        <p className="text-center">
                            Cette liste est vide pour le moment. Revenez plus
                            tard !
                        </p>
                    )}

                {ideas_available.length > 0 && (
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-1 w-full">
                            Cadeaux disponibles
                        </h1>
                        <div className="hidden sm:flex items-center text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour réserver un cadeau, cliquez sur le picto
                            </small>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                        </div>
                        <div className="hidden sm:flex items-center mb-3 text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour indiquer que vous avez acheté un cadeau,
                                cliquez sur le picto
                            </small>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 cursor-pointer"
                            >
                                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>

                        <div className="mt-4 space-y-6">
                            {Object.entries(groupedIdeas).map(
                                ([brand, brandData]) => (
                                    <div key={brand}>
                                        <div class="inline-flex items-center w-full">
                                            <hr class="w-full h-px mt-3 mb-2 bg-gray-300 border-0"></hr>
                                            <span class="absolute pr-3 font-medium bg-gray-50">
                                                {brand}
                                            </span>
                                        </div>
                                        <IdeasAvailable
                                            key={list.id}
                                            list={list}
                                            ideas={brandData.ideas_available}
                                            auth={auth}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

                {ideas_reserved.length > 0 && (
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-1 w-full">
                            Cadeaux réservés
                        </h1>
                        <div className="hidden sm:flex items-center text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour confirmer votre achat, cliquez sur le picto
                            </small>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 cursor-pointer"
                            >
                                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <div className="hidden sm:flex items-center mb-3 text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour annuler votre réservation, cliquez sur le
                                picto
                            </small>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
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
                )}

                {ideas_purchased.length > 0 && (
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-1 w-full">
                            Cadeaux achetés
                        </h1>
                        <div className="hidden sm:flex items-center mb-3 text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour annuler votre achat, cliquez sur le picto
                            </small>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
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
                )}
            </div>
        </AuthenticatedLayout>
    );
}

UserList.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    ideas_available: PropTypes.array,
    ideas_reserved: PropTypes.array,
    ideas_purchased: PropTypes.array,
};
