import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Index from "@/Pages/Users/Index";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bienvenue
                </h2>
            }
        >
            <Head title="Bienvenue" />

            <div className="flex justify-center py-12">
                <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    <p>Envie de créer une nouvelle liste ?</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
