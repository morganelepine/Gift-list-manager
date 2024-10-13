import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";
import Linkify from "linkify-react"; //rendre les liens cliquables
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import IdeasAvailable from "@/Components/Ideas/UserList/Available/Ideas_available";
import IdeasReserved from "@/Components/Ideas/UserList/Reserved/Ideas_reserved";
import IdeasPurchased from "@/Components/Ideas/UserList/Purchased/Ideas_purchased";

export default function UserList({
    auth,
    list,
    ideas_available,
    ideas_reserved,
    ideas_purchased,
}) {
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

    const h1 =
        "uppercase tracking-wider text-center rounded-full text-white w-full p-1 mb-3";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        La liste "{list.name}" de {list.user_name}
                    </h2>
                    <div className="hidden sm:flex">
                        <div className="flex items-center justify-end text-xs ml-3">
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
                        <div className="flex items-center justify-end text-xs ml-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p className="mr-1">Acheter</p>
                        </div>
                        <div className="flex items-center justify-end text-xs ml-3">
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
            <Head title="Liste " />

            <div className="max-w-3xl mx-auto pb-14 px-4 mt-6">
                {ideas_available.length == 0 &&
                    ideas_reserved.length == 0 &&
                    ideas_purchased.length == 0 && (
                        <p className="text-center">
                            Cette liste est vide pour le moment. Revenez plus
                            tard !
                        </p>
                    )}

                {ideas_available.length === 0 &&
                    (ideas_purchased.length > 0 ||
                        ideas_reserved.length > 0) && (
                        <>
                            <h1 className={`bg-orange-500 ${h1}`}>
                                Idées disponibles
                            </h1>
                            <p className="text-center text-sm italic mb-10">
                                Cette liste est vide pour le moment. Revenez
                                plus tard !
                            </p>
                        </>
                    )}

                {ideas_available.length > 0 && (
                    <>
                        <h1 className={`bg-orange-500 ${h1}`}>
                            Idées disponibles
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
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center bg-orange-50 rounded-xl mt-0 sm:px-6 sm:py-4 p-3 mb-10">
                            <div className="mt-4 space-y-8">
                                {Object.entries(groupedIdeas).map(
                                    ([brand, brandData]) => (
                                        <div key={brand}>
                                            <div className="inline-flex items-center w-full">
                                                <p className="min-w-max py-1 px-2 text-sm bg-orange-500 text-white rounded-full">
                                                    {brand}
                                                </p>
                                                <hr className="w-full h-px mt-3 mb-2 bg-orange-200 border-0"></hr>
                                            </div>
                                            {brand === "Nébuleuse" && (
                                                <div className="flex flex-wrap rounded p-1 sm:p-0 mt-1 mb-3">
                                                    <p className="text-xs italic ">
                                                        Lien à utiliser pour
                                                        bénéficier de la
                                                        réduction de parrainage
                                                        (-15%)&nbsp;:&nbsp;{" "}
                                                        <span className="text-xs italic  hover:text-orange-500">
                                                            <Linkify
                                                                options={{
                                                                    target: "blank",
                                                                }}
                                                            >
                                                                https://snwbl.io/nebuleuse/ROXANE66244
                                                            </Linkify>
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                            <IdeasAvailable
                                                key={list.id}
                                                auth={auth}
                                                ideas={
                                                    brandData.ideas_available
                                                }
                                                brand={brand}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </>
                )}

                {ideas_purchased.length > 0 && (
                    <>
                        <h1 className={`bg-indigo-500 ${h1}`}>
                            Cadeaux achetés
                        </h1>
                        <div className="hidden sm:flex items-center mb-3 text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour annuler votre achat, cliquez sur le picto
                            </small>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center bg-indigo-50 rounded-xl mt-0 sm:px-6 sm:py-4 p-3 mb-10">
                            <div className="flex items-center justify-between w-full">
                                <IdeasPurchased
                                    key={list.id}
                                    list={list}
                                    ideas={ideas_purchased}
                                    auth={auth}
                                />
                            </div>
                        </div>
                    </>
                )}

                {ideas_reserved.length > 0 && (
                    <>
                        <h1 className={`bg-bordeaux-800 ${h1}`}>
                            Cadeaux réservés
                        </h1>
                        <div className="hidden sm:flex items-center text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour confirmer votre achat, cliquez sur le picto
                            </small>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div className="hidden sm:flex items-center mb-3 text-gray-500 italic">
                            <small className="text-xs mr-1">
                                Pour annuler votre réservation, cliquez sur le
                                picto
                            </small>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center bg-bordeaux-50 rounded-xl mt-0 sm:px-6 sm:py-4 p-3 mb-10">
                            <div className="flex items-center justify-between w-full">
                                <IdeasReserved
                                    key={list.id}
                                    list={list}
                                    ideas={ideas_reserved}
                                    auth={auth}
                                />
                            </div>
                        </div>
                    </>
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
