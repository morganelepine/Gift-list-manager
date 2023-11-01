import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Idea from "@/Components/Idea/Idea";

export default function Index({ auth, ideas }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Consulter ma liste" />

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-4">
                <div className="mt-6">
                    {ideas.map((idea) => (
                        <Idea key={idea.id} idea={idea} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
