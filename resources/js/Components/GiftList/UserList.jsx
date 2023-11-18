import React from "react";
import PropTypes from "prop-types";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListOfIdeas from "@/Components/GiftList/ListOfIdeas";

export default function UserList({ auth, list, ideas, followedList }) {
    console.log("followedList : ", followedList);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        La liste "{list.name}" de {list.user_name}
                    </h2>
                </div>
            }
        >
            <Head title="Ma liste" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="my-1 flex items-center justify-center">
                    <ListOfIdeas
                        key={list.id}
                        list={list}
                        ideas={ideas}
                        auth={auth}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

UserList.propTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.object,
    ideas: PropTypes.array,
};
