import React from "react";
import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListToFollow from "@/Components/User/ListToFollow";

export default function ListsToFollow({ auth, listsToFollow }) {
    // console.log("listsToFollow : ", listsToFollow);

    // const [privateCode, setPrivateCode] = useState(false);
    // const togglePrivateCode = () => {
    //     setPrivateCode((current) => !current);
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Les listes à suivre
                </h2>
            }
        >
            <Head title="Les listes à suivre" />
            <div className="max-w-5xl mx-auto px-4 sm:p-4">
                <div className="mt-6 sm:flex justify-evenly">
                    {listsToFollow.length > 0 ? (
                        <div className="flex flex-col sm:flex-row sm:space-x-10">
                            {listsToFollow.map((listToFollow) => (
                                <div className="p-5 my-2 flex flex-col text-center shadow bg-white rounded-xl w-full">
                                    <ListToFollow
                                        key={listToFollow.id}
                                        listToFollow={listToFollow}
                                        auth={auth}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <p className="text-center">
                                Il n'y a actuellement aucune liste à suivre.
                                Revenez plus tard&nbsp;!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

ListsToFollow.propTypes = {
    auth: PropTypes.object.isRequired,
    listsToFollow: PropTypes.array,
};
