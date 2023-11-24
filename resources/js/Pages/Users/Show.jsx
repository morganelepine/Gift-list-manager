import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import IdeaShow from "@/Components/GiftList/Ideas/All/State/IdeaShow";
import AdminButtons from "@/Components/GiftList/Ideas/Available/Buttons";

export default function Show({ auth, user, ideas }) {
    // console.log("user.id : ", user.id);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    La liste de {user.name}
                </h2>
            }
        >
            <Head title={`La liste de ${user.name}`} />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                {ideas.map((idea) => (
                    <div key={idea.id} className="my-2 flex items-center">
                        {/* BUTTONS */}
                        <div className="flex flex-col mr-2">
                            <AdminButtons idea={idea} />
                        </div>

                        {/* LIST */}
                        <div className="p-3 flex flex-1 flex-col bg-white shadow-sm rounded-lg">
                            <IdeaShow idea={idea} />
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
