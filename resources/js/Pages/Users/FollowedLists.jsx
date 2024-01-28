import React from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FollowedList from "@/Components/User/FollowedList";
import NoListFollowed from "@/Components/User/EmptyList/NoListFollowed";

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
            <div className="max-w-4xl mx-auto pb-14 px-4 mt-6">
                {followedLists.length > 0 ? (
                    <div className="mt-6 sm:flex justify-evenly">
                        <div className="flex flex-col sm:flex-row sm:space-x-10">
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
                    </div>
                ) : (
                    <NoListFollowed />
                )}
            </div>
        </AuthenticatedLayout>
    );
}

FollowedLists.propTypes = {
    auth: PropTypes.object.isRequired,
    followedLists: PropTypes.array,
};
