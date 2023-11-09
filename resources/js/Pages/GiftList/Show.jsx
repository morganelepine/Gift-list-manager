import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListOfIdeas from "@/Components/GiftList/ListOfIdeas";

export default function Show({ auth, list, ideas }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ma liste : {list.name}
                </h2>
            }
        >
            <Head title="Ma liste" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="mt-6">
                    <div className="my-1 flex items-center">
                        <ListOfIdeas
                            // key={idea.id}
                            ideas={ideas}
                            auth={auth}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Show.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    ideas: PropTypes.array,
};
