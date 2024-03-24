import React from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FollowedList from "@/Components/User/FollowedList";
import AuthListCard from "@/Components/User/AuthListCard";
import NoListCreated from "@/Components/User/EmptyList/NoListCreated";
import NoListFollowed from "@/Components/User/EmptyList/NoListFollowed";

export default function Index({ auth, followedLists, mylists, users }) {
    // console.log("listsToFollow : ", listsToFollow);

    const admin = "m.lepineutter@gmail.com";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Les listes à suivre" />
            <div className="max-w-6xl mx-auto px-4 sm:p-4">
                <div className="sm:mt-6 sm:flex justify-evenly pb-20">
                    <div className="flex flex-col items-center sm:w-1/3 mt-12 sm:mt-0">
                        <h1 className="text-xl font-semibold mb-2">
                            Les listes suivies
                        </h1>
                        {followedLists.length > 0 ? (
                            followedLists.map((followedList) => (
                                <div
                                    className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full"
                                    key={followedList.id}
                                >
                                    <FollowedList
                                        followedList={followedList}
                                        auth={auth}
                                    />
                                </div>
                            ))
                        ) : (
                            <NoListFollowed />
                        )}
                    </div>

                    <div className="flex flex-col items-center sm:w-1/3 mt-12 sm:mt-0 ">
                        <h1 className="text-xl font-semibold mb-2">
                            Mes listes
                        </h1>
                        {mylists.length > 0 ? (
                            mylists.map((list) => (
                                <div
                                    className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full"
                                    key={list.id}
                                >
                                    <AuthListCard list={list} auth={auth} />
                                </div>
                            ))
                        ) : (
                            <NoListCreated />
                        )}
                    </div>

                    {auth.user.email === admin && (
                        <div className="flex flex-col items-center sm:w-1/3 mt-12 sm:mt-0 ">
                            <h1 className="text-xl font-semibold mb-2">
                                Les inscrit·es
                            </h1>
                            <div className="flex flex-wrap justify-center">
                                {users.map((user) => (
                                    <div
                                        className="px-3 py-2 m-2 flex flex-col text-center text-sm shadow bg-indigo-50 rounded-full"
                                        key={user.id}
                                    >
                                        <p>{user.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.array,
    followedLists: PropTypes.array,
    mylists: PropTypes.array,
};
