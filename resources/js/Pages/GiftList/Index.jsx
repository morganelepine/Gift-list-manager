import { Head } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrivateLists from "@/Components/GiftList/Index/PrivateLists";
import SharedLists from "@/Components/GiftList/Index/SharedLists";
import FollowedLists from "@/Components/GiftList/Index/FollowedLists";

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
                    <FollowedLists auth={auth} followedLists={followedLists} />

                    <SharedLists auth={auth} mySharedLists={mySharedLists} />

                    <PrivateLists auth={auth} myPrivateLists={myPrivateLists} />
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
