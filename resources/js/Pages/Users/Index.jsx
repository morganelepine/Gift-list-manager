import React from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListsToFollow from "@/Components/User/ListToFollow";
import FollowedList from "@/Components/User/FollowedList";
import MyLists from "@/Components/User/MyLists";

export default function Index({ auth, listsToFollow, followedLists, mylists }) {
    // console.log("listsToFollow : ", listsToFollow);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Les listes
                </h2>
            }
        >
            <Head title="Les listes à suivre" />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="mt-6 sm:flex sm:space-x-20 justify-evenly">
                    {listsToFollow.length > 0 && (
                        <div className="flex flex-col items-center sm:w-1/3">
                            <h1 className="text-xl font-semibold mb-2">
                                Les listes à suivre
                            </h1>
                            {listsToFollow.map((listToFollow) => (
                                <div className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full">
                                    <ListsToFollow
                                        key={listToFollow.id}
                                        listToFollow={listToFollow}
                                        auth={auth}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {followedLists.length > 0 && (
                        <div className="flex flex-col items-center sm:w-1/3 mt-12 sm:mt-0">
                            <h1 className="text-xl font-semibold mb-2">
                                Les listes suivies
                            </h1>
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
                    )}

                    {mylists.length > 0 && (
                        <div className="flex flex-col items-center sm:w-1/3 mt-12 sm:mt-0 ">
                            <h1 className="text-xl font-semibold mb-2">
                                Mes listes
                            </h1>
                            {mylists.map((list) => (
                                <div className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full">
                                    <MyLists
                                        key={list.id}
                                        list={list}
                                        auth={auth}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    listsToFollow: PropTypes.array,
    followedLists: PropTypes.array,
    mylists: PropTypes.array,
};
