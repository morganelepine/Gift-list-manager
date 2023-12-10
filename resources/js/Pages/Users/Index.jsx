import React from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListsToFollow from "@/Components/User/ListsToFollow";
import FollowedList from "@/Components/User/FollowedList";

export default function Index({ auth, listsToFollow, followedLists }) {
    // console.log("listsToFollow : ", listsToFollow);
    // console.log("followedLists : ", followedLists);

    // const [privateCode, setPrivateCode] = useState(false);
    // const togglePrivateCode = () => {
    //     setPrivateCode((current) => !current);
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Les listes suivies / à suivre
                </h2>
            }
        >
            <Head title="Les listes à suivre" />
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="mt-6 flex justify-evenly">
                    {followedLists.length > 0 && (
                        <div className="flex flex-col items-center w-3/6">
                            <h1 className="text-xl font-semibold">
                                Mes listes suivies
                            </h1>
                            {followedLists.map((followedList) => (
                                <FollowedList
                                    key={followedList.id}
                                    followedList={followedList}
                                    auth={auth}
                                />
                            ))}
                        </div>
                    )}

                    {listsToFollow.length > 0 && (
                        <div className="flex flex-col items-start w-3/6">
                            <h1 className="text-xl font-semibold">
                                Les listes à suivre
                            </h1>
                            {listsToFollow.map((listToFollow) => (
                                <div className="py-3">
                                    <ListsToFollow
                                        key={listToFollow.id}
                                        listToFollow={listToFollow}
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
    users: PropTypes.array,
    listsToFollow: PropTypes.array,
    followedLists: PropTypes.array,
};
