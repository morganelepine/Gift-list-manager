import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/Laravel/InputError";
import TextInput from "@/Components/Laravel/TextInput";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
export default function Index({ auth, users, authUserId }) {
    // console.log("users : ", users);

    const { data, setData, get, processing, reset, errors } = useForm({
        private_code: "",
    });
    const submit = (e) => {
        if (data.private_code === authUserId.private_code) {
            e.preventDefault();
            get(route("users.show"), { onSuccess: () => reset() });
        } else {
            return;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Les listes à suivre" />

            <div className="flex justify-center py-12">
                <div className="flex flex-col items-center">
                    <h1>Voir la liste de :</h1>
                    {users.map((user) => (
                        <>
                            <Link
                                as="button"
                                key={user.id}
                                href={route("users.show", user.id)}
                                className="text-center mt-5 px-4 py-2 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                {user.name}
                            </Link>
                        </>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Index.propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.array,
    authUserId: PropTypes.number,
};
