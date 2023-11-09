import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PropTypes from "prop-types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/Laravel/InputError";
import TextInput from "@/Components/Laravel/TextInput";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
export default function Index({ auth, users, authUserId }) {
    // console.log("users : ", users);

    const [privateCode, setPrivateCode] = useState(false);
    const togglePrivateCode = () => {
        setPrivateCode((current) => !current);
    };

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
                <div className="flex items-center">
                    {users.map((user) => (
                        <>
                            <button
                                key={user.id}
                                onClick={togglePrivateCode}
                                className="m-5 text-center mt-4 px-4 py-2 bg-indigo-200 border border-transparent rounded-md font-semibold text-md text-indigo-800 hover:text-white hover:bg-indigo-500 focus:bg-indigo-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                {/* <Link href={route("ideas.index")}>{user.name}</Link> */}
                                {user.name}
                            </button>
                            {privateCode && (
                                <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                                    <form onSubmit={submit}>
                                        {/* @csrf */}
                                        <p className="text-sm italic mb-6">
                                            Veuillez renseigner le code secret
                                            que {user.name} vous a communiqué
                                        </p>
                                        <div className="my-2">
                                            <TextInput
                                                id="private_code"
                                                name="private_code"
                                                value={data.private_code}
                                                placeholder="Le code secret"
                                                className="block w-full py-1 mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "private_code"
                                                        // e.target.value
                                                    )
                                                }
                                                required
                                            />

                                            <InputError
                                                message={errors.private_code}
                                                className="mt-2"
                                            />
                                        </div>
                                        <PrimaryButton
                                            className="mt-6"
                                            disabled={processing}
                                        >
                                            Accéder à la liste de {user.name}
                                        </PrimaryButton>
                                    </form>
                                </div>
                            )}
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
