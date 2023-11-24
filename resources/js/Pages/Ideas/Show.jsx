import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Idea from "@/Components/GiftList/Ideas/Available/Ideas";

export default function Show({ auth, idea }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Une idée" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6">
                    <Idea idea={idea} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Show.propTypes = {
    auth: PropTypes.object.isRequired,
    idea: PropTypes.object,
};
