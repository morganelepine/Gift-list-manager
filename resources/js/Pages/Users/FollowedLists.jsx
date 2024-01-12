import React from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FollowedList from "@/Components/User/FollowedList";

export default function FollowedLists({ auth, followedLists }) {
    // console.log("followedLists : ", followedLists);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Les listes suivies
                </h2>
            }
        >
            <Head title="Les listes à suivre" />
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="mt-6 sm:flex justify-evenly">
                    {followedLists.length > 0 ? (
                        <div className="flex flex-col items-center">
                            {followedLists.map((followedList) => (
                                <div className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full">
                                    <FollowedList
                                        key={followedList.id}
                                        followedList={followedList}
                                        auth={auth}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center mt-12 sm:mt-0">
                            <h1 className="text-xl font-semibold mb-2">
                                Vous ne suivez aucune liste.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

FollowedLists.propTypes = {
    auth: PropTypes.object.isRequired,
    followedLists: PropTypes.array,
};
