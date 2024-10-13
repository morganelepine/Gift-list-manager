import React from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FollowedList from "@/Components/GiftList/User/ListFollowed/FollowedListCard";
import AuthListCard from "@/Components/GiftList/Auth/AuthListCard";
import NoListCreated from "@/Components/GiftList/Auth/NoListCreated";
import NoListFollowed from "@/Components/GiftList/User/ListFollowed/NoListFollowed";

export default function Index({
    auth,
    followedLists,
    mySharedLists,
    myPrivateLists,
}) {
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
            <div className="max-w-7xl mx-auto px-4 sm:p-4">
                <div className="sm:mt-6 md:flex justify-evenly pb-20 md:space-x-14">
                    <div className="flex flex-col items-center text-center md:w-1/3 mt-12 md:mt-0">
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

                    <div className="flex flex-col items-center text-center md:w-1/3 mt-12 md:mt-0">
                        <h1 className="text-xl font-semibold mb-2">
                            Mes listes partagées
                        </h1>
                        {mySharedLists.length > 0 ? (
                            mySharedLists.map((list) => (
                                <div
                                    className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full"
                                    key={list.id}
                                >
                                    <AuthListCard list={list} auth={auth} />
                                </div>
                            ))
                        ) : (
                            <NoListCreated listType="à partager" />
                        )}
                    </div>

                    <div className="flex flex-col items-center text-center md:w-1/3 mt-12 md:mt-0">
                        <h1 className="text-xl font-semibold mb-2">
                            Mes listes privées
                        </h1>
                        {myPrivateLists.length > 0 ? (
                            myPrivateLists.map((list) => (
                                <div
                                    className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full"
                                    key={list.id}
                                >
                                    <AuthListCard list={list} auth={auth} />
                                </div>
                            ))
                        ) : (
                            <NoListCreated listType="privée" />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    followedLists: PropTypes.array,
    mySharedLists: PropTypes.array,
    myPrivateLists: PropTypes.array,
};
