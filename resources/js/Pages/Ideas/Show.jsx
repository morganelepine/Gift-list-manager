import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Idea from "@/Components/Idea/Idea";

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
